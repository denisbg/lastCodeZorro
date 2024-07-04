
import cordZ3img1 from '../../assets/images/universes/z3-cord-30-1.png';
import cordZ3img2 from '../../assets/images/universes/z3-cord-30-2.png';
import cordZ3img3 from '../../assets/images/universes/z3-cord-30-3.png';
import elecZ3img1 from '../../assets/images/universes/z3-elec-19-1.png';
import elecZ3img2 from '../../assets/images/universes/z3-elec-19-2.png';
import elecZ3img3 from '../../assets/images/universes/z3-elec-19-3.png';
import coutZ3img1 from '../../assets/images/universes/z3-cout-17-1.png';
import coutZ3img2 from '../../assets/images/universes/z3-cout-17-2.png';
import coutZ3img3 from '../../assets/images/universes/z3-cout-17-3.png';
import univZ3img1 from '../../assets/images/universes/uni01NotFound.png';
import univZ3img2 from '../../assets/images/universes/uni02NotFound.png';
import univZ3img3 from '../../assets/images/universes/uni03NotFound.png';
import univZ3infx from '../../assets/images/universes/uniXxNotFound.png';
// To do better  
// Naming of image
export default function getImgUniverse(universeId, imageId, filename) {
    var picture = 'none';

    if (universeId == '30') {

        switch (imageId) {
            case 1:
                picture = cordZ3img1;
                break;
            case 2:
                picture = cordZ3img2;
                break;
            case 3:
                picture = cordZ3img3;
                break;

            default:
                console.log(`WARNING 30, not found image universe: ${universeId} image:  ${imageId}.`);

        }
    }
    if (universeId == '19') {
        switch (imageId) {
            case 1:
                picture = elecZ3img1;
                break;
            case 2:
                picture = elecZ3img2;
                break;
            case 3:
                picture = elecZ3img3;
                break;

            default:
                console.log(`WARNING 19 not found image universe: ${universeId} image:  ${imageId}.`);
        }
    }
    if (universeId == '17') {
        switch (imageId) {
            case 1:
                picture = coutZ3img1;
                break;
            case 2:
                picture = coutZ3img2;
                break;
            case 3:
                picture = coutZ3img3;
                break;

            default:
                console.log(`WARNING 19 not found image universe: ${universeId} image:  ${imageId}.`);
        }
    }
    picture =  filename;

    picture =  filename;
    console.log("STEP UNIVERS IMAGE",filename);


    if (picture == 'none') {

        console.log(`WARNING xx no universe repository found :-${universeId}-.`);
        picture = univZ3infx;
        switch (imageId) {
            case 1:
                picture = univZ3img1;
                break;
            case 2:
                picture = univZ3img2;
                break;
            case 3:
                picture = univZ3img3;
                break;

            default:
                console.log(`WARNING  ${universeId} no image found for image not found (: universe  ${universeId} : image ${imageId} not found.`);
        }

    }
    return (picture);



};