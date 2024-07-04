<?php


namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpClient\NativeHttpClient;
use App\Entity\User;
$enterprise =  $user->getenterprise();
            $postalCode =  $user->getPostalCode();
            $city       =  $user->getCity();
            $lastname   =  $user->getLastName();
            $latitude   =  $user->getLatitude();
            $longitude  =  $user->getLongitude();
            
             /******************/

$filename = '/tmp/people.txt';
// { lat: 48.9940649, lng: 2.5229373 }
//$somecontent = "Notice:".$user->getenterprise()."ETS ".$user->getLastName()." :GetUsersRepairManAction:Latitude ".$user->getLatitude().":"."\n";
$somecontent = "{ ".
                "entreprise:".$enterprise.
                ", postalcode:".$postalCode.
                ", city:".$city.
                ", lastname:".$lastname.
                ", latitude:".$latitude.
                ", longitude:".$longitude.
                "},";