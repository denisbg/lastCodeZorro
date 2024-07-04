
import cordZ3img1 from '../../assets/images/universes/z3-cord-1.png';
import cordZ3img2 from '../../assets/images/universes/z3-cord-2.png';
import cordZ3img3 from '../../assets/images/universes/z3-cord-3.png';
import elecZ3img1 from '../../assets/images/universes/z3-elec-1.png';
import elecZ3img2 from '../../assets/images/universes/z3-elec-2.png';
import elecZ3img3 from '../../assets/images/universes/z3-elec-3.png';
import uni01nf from '../../assets/images/universes/uni01NotFound.png';
import uni02nf from '../../assets/images/universes/uni02NotFound.png';
import uni03nf from '../../assets/images/universes/uni03NotFound.png';
import uniXxnf from '../../assets/images/universes/uniXxNotFound.png';

export default function getImgUniverse(universeId, imageId) 
{
    var picture = uniXxnf;
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
            console.log(`Sorry, not found image universe: ${universeId} image:  ${imageId}.`);
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
            picture = uninfnf;
            break;
        }
      

    }
    return (picture);

  };