//import { cities} from  '../../assets/data/cities.js';
export default function RepairManlatlng() {
  
const remain = [

     
    { label: "Atelier Van de Kerkhove", postalcode: "78430", city_code: "Louveciennes", lastname: "Commode", lat :48.8669234, lng: 2.1132995},
    { label: "Brico Dépôt", postalcode: "75011", city_code: "Paris", lastname: "Bricoltout", lat :48.861628, lng: 2.3808215},
    { label: "Chez PIERRE", postalcode: "75003", city_code: "Paris", lastname: "Lancelot", lat :48.8650928, lng: 2.3551431},
    { label: "Conforama", postalcode: "93140", city_code: "Bondy", lastname: "Empire", lat :48.9059715, lng: 2.4772343},
    { label: "Cordonnerie Verneau", postalcode: "72100", city_code: "Le Mans", lastname: "Verneau", lat :47.988903, lng: 0.2071386},
    { label: "Cyber", postalcode: "75009", city_code: "Paris", lastname: "Caltir", lat :48.8825626, lng: 2.3453274}, { label: "De Fil En Aiguille", postalcode: "75020", city_code: "Paris", lastname: "Brevet", lat :48.8570622, lng: 2.4065092}, 
    { label: "Electro Réparation", postalcode: "75015", city_code: "Paris", lastname: "Durand", lat :48.8375861, lng: 2.3000603},
    { label: "Electro'actor", postalcode: "75017", city_code: "Paris", lastname: "Gisèle", lat :48.8844043, lng: 2.3227613}, { label: "Entreprise 20/10", postalcode: "77600", city_code: "Bussy-Saint-Georges", lastname: "Trouvard", lat: 48.8344163, lng: 2.7178872 }, 
    { label: "Entreprise test Firefox", postalcode: "75002", city_code: "Paris", lastname: "Boulanger", lat :48.8682323, lng: 2.350617},
     { label: "F&C", postalcode: "75001", city_code: "Paris", lastname: "DRZEWINSKI", lat :48.863091, lng: 2.333307}, { label: "Fast Electronique", postalcode: "75020", city_code: "Paris", lastname: "Diakho", lat :48.8723945, lng: 2.3915623}, { label: "Feel and Clic", postalcode: "75008", city_code: "Paris", lastname: "Dieulle", lat :48.8771113, lng: 2.3143844}, { label: "GREGOS", postalcode: "75010", city_code: "Paris", lastname: "GREGOS", lat :48.8754482, lng: 2.363198}, { label: "L'ATELIER DE GG", postalcode: "75008", city_code: "Paris", lastname: "Gauthier", lat :48.8686995, lng: 2.3219191}, { label: "La Très Belle Société avec Un Nom Compliqué", postalcode: "75003", city_code: "Paris", lastname: "de Lattre de Réparini", lat :48.8650928, lng: 2.3551431}, { label: "Leblanc réparation", postalcode: "75012", city_code: "Paris", lastname: "Leblanc", lat :48.8460638, lng: 2.3798022}, { label: "Les Petits Génies - Les spécialistes Apple", postalcode: "75009", city_code: "Paris", lastname: "Bug", lat :48.8755995, lng: 2.3422583},
    { label: "Longue vie aux chaussures", postalcode: "75008", city_code: "Paris", lastname: "Pantoufle", lat :48.8724646, lng: 2.3241843},
    { label: "Ma nouvelle entreprise Preprod", postalcode: "75007", city_code: "Paris", lastname: "Fourtu", lat :48.8499965, lng: 2.3231276},
     { label: "Maison Mauriès", postalcode: "75018", city_code: "Paris", lastname: "Mauriès", lat :48.8862446, lng: 2.336673}, 
     { label: "Mobilier'JP", postalcode: "75003", city_code: "Paris", lastname: "Radig", lat :48.8650928, lng: 2.3551431},
      { label: "Mon Mobilier", postalcode: "75007", city_code: "Paris", lastname: "Galet", lat :48.8540113, lng: 2.3301188},
       { label: "Ordi Dépannage", postalcode: "75005", city_code: "Paris", lastname: "Disquette", lat :48.8495948, lng: 2.345398},
    { label: "REPAIRMAN", postalcode: "75003", city_code: "Paris", lastname: "Gillo", lat :48.8680689, lng: 2.3552528},
     { label: "Repy", postalcode: "75019", city_code: "Paris", lastname: "Repare", lat :48.8840213, lng: 2.3900127},
      { label: "Retest carte", postalcode: "75018", city_code: "Paris", lastname: "Carte",lat :48.8840213, lng: 2.3900127 },
       { label: "SAV Smartphone", postalcode: "75011", city_code: "Paris", lastname: "Mimoun", lat :48.8643122, lng: 2.3695806},
       { label: "Societe", postalcode: "72100", city_code: "Le Mans", lastname: "Test", lat :47.988903, lng: 0.2071386}, { label: "SOS PC", postalcode: "75004", city_code: "Paris", lastname: "Virus", lat :48.8575615, lng: 2.3531936}, { label: "test", postalcode: "75006", city_code: "Paris", lastname: "rerz", lat :48.8505509, lng: 2.3326066}, { label: "test", postalcode: "75006", city_code: "Paris", lastname: "test", lat :48.8505509, lng: 2.3326066},
    { label: "TEST 1 ", postalcode: "75011", city_code: "Paris", lastname: "TEST", lat :48.8643122, lng: 2.3695806},
    { label: "test crea 1", postalcode: "75008", city_code: "Paris", lastname: "test", lat :48.8719448, lng: 2.3430641}, { label: "test creation stripe", postalcode: "75012", city_code: "Paris", lastname: "Creation", lat :48.8840213, lng: 2.3900127 },
    { label: "test new rep", postalcode: "78100", city_code: "Saint-Germain-en-Laye", lastname: "newrep", lat :48.896917, lng: 2.0901461},
    { label: "Test presta", postalcode: "75006", city_code: "Paris", lastname: "Test", lat :48.8505509, lng: 2.3326066}, { label: "Testcrea", postalcode: "77470", city_code: "Montceaux-lès-Meaux", lastname: "Test", lat :48.9430472, lng: 2.9865731},
  ];
  return [];

}