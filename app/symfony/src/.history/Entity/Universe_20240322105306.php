<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UniverseRepository;
use App\Controller\Api\DeleteUniverseAction;
use App\Controller\Api\SearchUniversesAction;
use App\Controller\Api\GetUniversesCategoriesDetailsAction;
use App\Controller\Api\GetUniverseCategories;
use App\Controller\Api\PutUniverseAction;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiFilter;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ORM\Entity(repositoryClass=UniverseRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *     attributes = {
 *          "order" = {"position": "ASC"},
 *          "pagination_enabled" = false,
 *     },
 *     collectionOperations={
 *          "get_universes" = {
 *              "method" = "get",
 *              "path" = "/anonymous/universes",
 *              "normalization_context"={
 *                  "groups"={"read","read:universe","read:universe:imagehome"}
 *              },
 *          },
 *          "get_universes_details" = {
 *              "method" = "get",
 *              "path" = "/anonymous/universes/details",
 *              "normalization_context"={
 *                  "groups"={"read","read:universe","read:universe:details"}
 *              },
 *          },
 *          "get_universes_categories_details" = {
 *              "method" = "get",
 *              "path" = "/anonymous/universes/categories/details",
 *              "controller" = GetUniversesCategoriesDetailsAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:universe","read:universe:details","read:universe:categories:details","read:universe:categories:children"}
 *              },
 *          },
 *          "get_all_universes_categories_details" = {
 *              "method" = "get",
 *              "path" = "/anonymous/all/universes/categories/details",
 *              "controller" = GetUniversesCategoriesDetailsAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:universe","read:universe:details","read:universe:categories:details","read:universe:categories:children"}
 *              },
 *          },
 *          "get_universes_categories" = {
 *              "method" = "get",
 *              "path" = "/anonymous/universes/categories",
 *              "normalization_context"={
 *                  "groups"={"read","read:universe","read:universe:categories","read:universe:categories:children"}
 *              },
 *          },
 *          "get_universes_categories_repairman" = {
 *              "method" = "get",
 *              "path" = "/universes/categories/repairman",
 *              "normalization_context"={
 *                  "groups"={"read","read:universe","read:universe:categories","read:universe:categories:children"}
 *              },
 *          },
 *          "get_search_universes" = {
 *              "method" = "get",
 *              "path" = "/anonymous/search/universes",
 *              "controller" = SearchUniversesAction::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:universe:search"}
 *              },
 *          },
 *          "post_universe" = {
 *              "method" = "post",
 *              "path" = "/universe",
 *              "validation_groups"={"validation:universe:create"},
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *     },
 *     itemOperations = {
 *          "xget_universe" = {
 *              "method" = "get",
 *              "path" = "/anonymous/universe/{id}",
 *              "normalization_context"={
 *                  "groups"={"read","read:universe","read:universe:details"}
 *              },
 *          },
 *          "get_universe_categories" = {
 *              "method" = "get",
 *              "path" = "/anonymous/universe/{id}/categories",
 *              "controller" = GetUniverseCategories::class,
 *              "normalization_context"={
 *                  "groups"={"read","read:universe","read:universe:details","read:universe:categories:details","read:universe:categories:children"}
 *              },
 *          },
 *          "get_universe_users" = {
 *              "method" = "get",
 *              "path" = "/universe/{id}/users",
 *              "normalization_context"={
 *                  "groups"={"read","read:universe","read:universe:details","read:universe:users"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "delete_universe" = {
 *              "method" = "delete",
 *              "path" = "/universe/{id}",
 *              "controller" = DeleteUniverseAction::class,
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *          "put_universe" = {
 *              "method" = "put",
 *              "path" = "/universe/{id}",
 *              "validation_groups"={"validation:universe:edit"},
 *              "controller" =  PutUniverseAction::class,
 *              "normalization_context" = {
 *                  "groups"={"read","read:universe","read:universe:details","read:universe:categories"}
 *              },
 *              "denormalization_context" = {
 *                  "groups"={"edit:universe"}
 *              },
 *              "security" = "is_granted('ROLE_ADMIN')",
 *          },
 *     },
 * )
 * @ApiFilter(SearchFilter::class, properties={"users.id": "exact"})
 */
class Universe
{
    use IdentifiableTrait;
    use TimestampableTrait;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(groups={"validation:universe:create","validation:universe:edit"})
     * @Groups({"read:universe","read:user:showcases","edit:universe","read:universe:search","read:user:benefits"})
     */
    private ?string $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Gedmo\Slug(fields={"name"})
     * @Groups({"read:universe","read:user:showcases","edit:universe","read:universe:search","read:user:benefits"})
     */
    private $slug;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:user:benefits"})
     */
    private ?int $position;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:universe:search"})
     */
    private ?string $description;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:universe:search"})
     */
    private ?string $descriptionPictures;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"read:universe:details","edit:universe"})
     */
    private ?array $pictures = [];

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank(groups={"validation:universe:create","validation:universe:edit"})
     * @Groups({"read:universe:details","edit:universe"})
     */
    private ?string $image;



    /**
     * @ORM\OneToMany(targetEntity=Category::class, mappedBy="universe", orphanRemoval=true)
     * @Groups({"read:universe:categories","read:universe:categories:details","read:universe:categories:children"})
     */
    private $categories;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="showcases")
     * @Groups({"read:universe:users"})
     */
    private $users;

    /**
     * @Groups({"read:universe"}) 
     */
    private ?int $totalServices = 0;

    /**
     * @ORM\Column(type="boolean", nullable=true, options={"default" : 0})
     * @Groups({"read:universe","edit:universe"}) 
     */
    private $enabled = false;

    /**
     * @ORM\OneToMany(targetEntity=Service::class, mappedBy="universe")
     */
    private $services;

    /**
     * @ORM\Column(options={"default" : "Catégorie"})
     * @Assert\NotBlank(groups={"validation:universe:create","validation:universe:edit"})
     * @Groups({"read:universe","read:user:showcases","edit:universe","read:universe:search"})
     */
    private ?string $nameCategory = "Catégorie(s)";

    /**
     * @ORM\Column(options={"default" : "Sous-catégorie"})
     * @Assert\NotBlank(groups={"validation:universe:create","validation:universe:edit"})
     * @Groups({"read:universe","read:user:showcases","edit:universe","read:universe:search"})
     */
    private ?string $nameSubCategory = "Sous-catégorie(s)";

    /**
     * @ORM\Column(type="string", length=1, nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:universe:imagehome"})
     */
    private $bonusreparation;


    /**
     * @ORM\Column(type="boolean", nullable=true, options={"default" : 0})
     * @Groups({"read:universe","read:user:showcases","edit:universe","read:universe:search"})
     */
    private ?bool $requireSearchSubCategory = false;
    
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:universe:imagehome"})
     */
    private ?string $imageHome;
  
   
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:universe:image_vitrine1"})
     */
    private  ?string $image_vitrine1;
   
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:universe:image_vitrine2"})
     */
    private  ?string $image_vitrine2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:universe:image_vitrine3"})
     */
    private  ?string $image_vitrine3;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:universe:image_anatomie"})
     */
    private  ?string $image_anatomie;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:universe:details","edit:universe","read:universe:labelanatomie"})
     */
    private $labelanatomie;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->services = new ArrayCollection();
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug)
    {
        $this->slug = $slug;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(?int $position)
    {
        $this->position = $position;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description)
    {
        $this->description = $description;
    }

    public function getDescriptionPictures(): ?string
    {
        return $this->descriptionPictures;
    }

    public function setDescriptionPictures(?string $descriptionPictures)
    {
        $this->descriptionPictures = $descriptionPictures;
    }

    public function getPictures(): ?array
    {
        return $this->pictures;
    }

    public function setPictures(?array $pictures)
    {
        $this->pictures = $pictures;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image)
    {
        $this->image = $image;
    }

  
    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category)
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
            $category->setUniverse($this);
        }
    }

    public function removeCategory(Category $category)
    {
        if ($this->categories->removeElement($category)) {
            // set the owning side to null (unless already changed)
            if ($category->getUniverse() === $this) {
                $category->setUniverse(null);
            }
        }
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user)
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addShowcase($this);
        }
    }

    public function removeUser(User $user)
    {
        if ($this->users->removeElement($user)) {
            $user->removeShowcase($this);
        }
    }

    public function getTotalServices(): ?int
    {
        return $this->totalServices;
    }

    public function setTotalServices(int $totalServices)
    {
        $this->totalServices = $totalServices;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(?bool $enabled)
    {
        $this->enabled = $enabled;
    }

    /**
     * @return Collection|Service[]
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service)
    {
        if (!$this->services->contains($service)) {
            $this->services[] = $service;
            $service->setUniverse($this);
        }
    }

    public function removeService(Service $service)
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getUniverse() === $this) {
                $service->setUniverse(null);
            }
        }
    }

    public function getNameCategory(): ?string
    {
        return $this->nameCategory;
    }

    public function setNameCategory(string $nameCategory)
    {
        $this->nameCategory = $nameCategory;
    }

    public function getNameSubCategory(): ?string
    {
        return $this->nameSubCategory;
    }

    public function setNameSubCategory(string $nameSubCategory)
    {
        $this->nameSubCategory = $nameSubCategory;
    }

    public function getRequireSearchSubCategory(): ?bool
    {
        return $this->requireSearchSubCategory;
    }

    public function setRequireSearchSubCategory(?bool $requireSearchSubCategory)
    {
        $this->requireSearchSubCategory = $requireSearchSubCategory;
    }
    
    public function getBonusreparation(): ?string
    {
        return $this->bonusreparation;
    }

    public function setBonusreparation(?string $bonusreparation): self
    {
        $this->bonusreparation = $bonusreparation;

        return $this;
    }
    
    public function getImageHome(): ?string
    {
        return $this->imageHome;
    }

    public function setImageHome(?string $imageHome)
    {
        $this->imageHome = $imageHome;
    }


    public function getImageVitrine1(): ?string
    {
        return $this->image_vitrine1;
    }

    public function setImageVitrine1(?string $image_vitrine1): self
    {
        $this->image_vitrine1 = $image_vitrine1;

        return $this;
    }

  

    public function getImageVitrine2(): ?string
    {
        return $this->image_vitrine2;
    }

    public function setImageVitrine2(?string $image_vitrine2): self
    {
        $this->image_vitrine2 = $image_vitrine2;

        return $this;
    }

    public function getImageVitrine3(): ?string
    {
        return $this->image_vitrine3;
    }

    public function setImageVitrine3(?string $image_vitrine3): self
    {
        $this->image_vitrine3 = $image_vitrine3;

        return $this;
    }

    public function getImageAnatomie(): ?string
    {
        return $this->image_anatomie;
    }

    public function setImageAnatomie(?string $image_anatomie): self
    {
        $this->image_anatomie = $image_anatomie;

        return $this;
    }

    public function getLabelanatomie(): ?string
    {
        return $this->labelanatomie;
    }

    public function setLabelanatomie(?string $labelanatomie): self
    {
        $this->labelanatomie = $labelanatomie;

        return $this;
    }
}
