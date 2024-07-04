<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Universe;
use App\Entity\Category;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

final class GetUniversesCategoriesDetailsAction
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
    public function __invoke($data)
    {
    
        $this->writeLog('Log from GetUniversesCategoriesDetailsAction');  
        /**
         * @var Universe $universe
         */
        foreach ($data as $universe) {
             $this->writeLog('Log from GetUniversesCategoriesDetailsAction---------:'.$universe->getName());  
            /**
             * @var Category $category
             */
            foreach ($universe->getCategories() as $category) {
                $total = 0;
                 $this->writeLog('Log  CAtegorie Name'.$category->getName());  
                /**
                 * @var Category $subCategory
                 */
                foreach ($category->getChildren() as $subCategory) {
                    $subTotal = count($subCategory->getServices());
                    $subCategory->setTotalServices($subTotal);
                    $total += $subTotal;
                }
                $category->setTotalServices($total);
            }
        }
        return $data;
    }
}
