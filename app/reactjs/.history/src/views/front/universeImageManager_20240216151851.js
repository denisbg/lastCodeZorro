export default function getImgUniv(imageId) 
{
    const universeId = slugIdUniverse.split("-").pop();
    var picture = UniverseNoImageFound;
    var alt = 'Default alt';
    var label = "Sorry, we are out of universe's image id ";
    switch (universeId) {
      case 1:
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
      case 1:
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
      default:
      case 1:
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
        console.log(`Sorry, we are out of universe's images ${universeId}.`);

    }
    return (picture);

  };