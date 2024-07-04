
import cordZ3img1 from '../../assets/images/z3-3.png';
import cordZ3img2 from '../../assets/images/z3-2.png';
import cordZ3img3 from '../../assets/images/z3-1.png';
import uni01nf from '../../assets/images/universes/uni01NotFound.png';
import uni02nf from '../../assets/images/universes/uni02NotFound.png';
import uni03nf from '../../assets/images/universes/uni03NotFound.png';
export default function getImgUniv(imageId) 
{
    const { slugIdUniverse, slugIdService } = useParams();
    const universeId = slugIdUniverse.split("-").pop();
    var picture = UniverseNoImageFound;
    var alt = 'Default alt';
    var label = "Sorry, we are out of universe's image id ";
    switch (universeId) {
      case 'cordonnerie-30':
        switch (imageId) {
          case 1:
            picture = cordZ3img1;
            break;
          case '2':
            picture = cordZ3img2;
            break;
          case '3':
            picture = cordZ3img3;
            break;

          default:
            console.log(`Sorry, we are out of universe's image id  ${imageId}.`);
            break;
        }
      case 'electroniques-19':
        switch (imageId) {
          case 1:
            picture = uni01nf;
            break;
          case '2':
            picture = uni02nf;
            break;
          case '3':
            picture = uni03nf;
            break;

          default:
            console.log(`Sorry, we are out of universe's image id  ${imageId}.`);
            break;
        }
      default:
      case 1:
        switch (imageId) {
          case 1:
            picture = uni01nf;
            break;
          case '2':
            picture = uni02nf;
            break;
          case '3':
            picture = uni03nf;
            break;

          default:
            console.log(`Sorry, we are out of universes ${imageId}.`);
            break;
        }
        console.log(`Sorry, no images from this universe ${universeId}.`);

    }
    return (picture);

  };