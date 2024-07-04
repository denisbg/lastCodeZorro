<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Universe;
use App\Entity\Service;
use App\Entity\Category;

final class GetUniverseCategories
{
    
    
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
     * @param Universe $data
     * @return Universe
     */
    public function __invoke(Universe $data): Universe
    {
        $idsServices = [];
        
        $this->writeLog('Log from GetUniverseCategories DEBUG ( a supprimer) ');
       
        
        /**
         * @var Category $category
         */
        foreach ($data->getCategories() as $category) {
        
            $this->writeLog('Log from GetUniverseCategories->universe:'.$category->getUniverse()->getId()."-------------------");
            $this->writeLog('Log from GetUniverseCategories->categorie Name:'.$category->getName());
            $this->writeLog('Log from GetUniverseCategories->categorie Slug:'.$category->getSlug());
            
            
            /**
             * @var Category $subCategory
             */
            foreach ($category->getChildren() as $subCategory) {
                $this->writeLog('Log from GetUniverseCategories Sous categorie ->:'. $subCategory->getName());
                /**
                 * @var Service $service
                 */
                foreach ($subCategory->getServices() as $service) {
                    if (count($service->getBenefits()) && !in_array($service->getId(), $idsServices)) {
                        $idsServices[] = $service->getId();
                        $this->writeLog('Log from GetUniverseCategories->Service found ........:'.$service->getId()." ".$service->getName());
                    }
                }
            }
        }
        
        //$tofile = var_dump($data);
        //$this->writeLog('Log from GetUniverseCategories var export DATA'.$tofile);
        $this->writeLog('Log from GetUniverseCategories->total services'.count($idsServices));
        
        $data->setTotalServices(count($idsServices));
       
        
        
        return $data;
    }
}
