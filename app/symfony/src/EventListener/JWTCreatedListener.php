<?php

declare(strict_types=1);

namespace App\EventListener;

use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManager;
use Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\Security\Core\Exception\LockedException;
use Symfony\Component\Security\Core\Security;

class JWTCreatedListener
{
    /**
     * @var EntityManager
     */
    private EntityManager $em;

    /**
     * @var Security
     */
    private Security $security;

    /**
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    public function writeLog($data) {
       list($usec, $sec) = explode(' ', microtime());
       $datetime = strftime("%Y%m%d %H:%M:%S",time());
       $msg = "$datetime'". sprintf("%06s",intval($usec*1000000)).": $data";
       $save_path = '/srv/www/fingz_test/app/symfony/public/media/privatelog.log';
       $fp = @fopen($save_path, 'a'); // open or create the file for writing and append info
       fputs($fp, "$msg\n"); // write the data in the opened file
       fclose($fp); // close the file
    }
    
    
    /**
     * @param JWTCreatedEvent $event
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        /** @var User $user */
        $userConnected = $this->security->getUser();
        
        $payload = $event->getData();
        
       
        
        /** @var User $user */
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $payload['username']]);
        
        
        if ($userConnected instanceof User ) {
            //$varexp= var_export($payload, true);
            //$this->writeLog("TRace Payload".$varexp);
            // Todo keep or drop
        }

        if ($userConnected instanceof User && in_array('ROLE_ADMIN', $userConnected->getRoles())) {
            //Do not do anything
        }else{
            if (0 == $user->getStatus()) {
                throw new LockedException('Votre compte en attente de validation par Fingz.');
            } else if (2 == $user->getStatus()) {
                throw  new LockedException("Votre compte est désactivé vous ne pouvez plus y accéder.");
            }
        }

        try {
            $user->setLastConnection(new DateTime());
            $this->em->persist($user);
            $this->em->flush();

            $payload['id'] = $user->getId();
            $payload['firstName'] = $user->getFirstName();
            $payload['lastName'] = $user->getLastName();
            $payload['isCompleted'] = $user->getIsRegistrationCompleted();
            $event->setData($payload);
        } catch (Exception $e) {
            throw new BadRequestException('Problème modification utilisateur ' . $e->getMessage());
        }
    }
}
