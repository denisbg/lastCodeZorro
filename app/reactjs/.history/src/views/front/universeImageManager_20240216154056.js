
import cordZ3img1 from '../../assets/images/universes/z3-3.png';
import cordZ3img2 from '../../assets/images/universes/z3-2.png';
import cordZ3img3 from '../../assets/images/universes/z3-1.png';
import uni01nf from '../../assets/images/universes/uni01NotFound.png';
import uni02nf from '../../assets/images/universes/uni02NotFound.png';
import uni03nf from '../../assets/images/universes/uni03NotFound.png';
import uniXxnf from '../../assets/images/universes/uniXxNotFound.png';

export default function getImgUniv(universeId, imageId) 
{
    var picture = uniXxnf;
    var alt = 'Default alt';
    var label = "Sorry, we are out of universe's image id ";
    switch (universeId) {
      case '30':
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
      case '19':
        switch (imageId) {
          case 1:
            picture = elecZ3img1;
            break;
          case '2':
            picture = elecZ3img2;
            break;
          case '3':
            picture = elecZ3img3;
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