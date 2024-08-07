import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TextService {
    private text1 = `Les dinosaures (parfois dinosauriens), de leur nom scientifique Dinosauria, forment un super-ordre
ainsi qu'un clade extrêmement diversifié de sauropsides de la sous-classe des diapsides et dont les uniques représentants
actuels sont les oiseaux. Ce sont des archosauriens ovipares, ayant en commun une posture érigée et partageant un certain
nombre de synapomorphies telles que la présence d'une crête deltopectorale allongée au niveau de l'humérus et un acetabulum
perforant le bassin. Présentes dès le milieu du Ladinien (deuxième étage du Trias moyen), il y a environ 240 millions
d'années (Ma), les lignées non aviennes des dinosaures disparaissent entièrement lors de l'extinction Crétacé-Paléogène
il y a 66 Ma. Les oiseaux, la lignée avienne, ont émergé de petits dinosaures théropodes du Jurassique supérieur ; cette
lignée est la seule à avoir survécu à l'extinction, ce qui a permis leur diversification considérable à partir du Cénozoïque.
Ce groupe de vertébrés majoritairement terrestres connut un succès évolutif considérable au Mésozoïque, dominant les faunes
continentales entre le Trias supérieur et le Crétacé supérieur pendant plus de 170 Ma. Présents sur l'ensemble des continents
dès la fin du Trias, ils comprennent des formes très diverses d'animaux terrestres et volants, bipèdes et quadrupèdes,
carnivores et herbivores, ayant développé toute une série d'innovations squelettiques et tégumentaires telles que des cornes,
des crêtes, des plaques et des plumes. Les dinosaures non aviens comptent parmi eux les animaux les plus grands et les plus lourds
ayant existé sur la terre ferme. Néanmoins, un grand nombre de dinosaures ne dépassait pas la taille d'un être humain et certains
d'entre eux étaient plus petits qu'une poule. La classification standard des dinosaures distingue deux grands clades selon la
morphologie de leur bassin : les Ornithischia et les Saurischia. Les Ornithischia (ou Ornithischiens) ne comprennent que
des dinosaures herbivores que les paléontologues divisent en trois groupes majeurs : les Ornithopoda qui regroupent des dinosaures
majoritairement bipèdes dont les fameux dinosaures à « bec de canard » (ou Hadrosauridae), les Marginocephalia qui incluent des
dinosaures à collerette et à dôme osseux sur le haut de la tête (respectivement les Ceratopsia et les Pachycephalosauria),
et enfin les Thyreophora qui englobent des dinosaures quadrupèdes surmontés d'armures, de piques et de plaques osseuses sur le
dos et la queue (les Ankylosauria et les Stegosauria). Les Saurischia (ou Saurischiens) sont divisés en deux clades bien distincts,
les Theropoda qui comprennent des dinosaures bipèdes et l'entièreté des dinosaures carnivores et piscivores ainsi que les dinosaures
à plumes et les dinosaures volants (les oiseaux dans leur grande majorité), et les Sauropodomorpha, des animaux généralement quadrupèdes`;
    private text2 = `La permaculture est, selon ses concepteurs David Holmgren et Bill Mollison, à la fois une science et un art de concevoir
des écosystèmes régénératifs en s'inspirant du fonctionnement du vivant (biomimétisme ou écomimétisme). Elle rassemble à
la fois une éthique, un ensemble de principes, ainsi que des outils méthodologiques permettant de concevoir tous types
de systèmes, du petit potager familial à l'aménagement de bassins versants, en passant par des lieux de vie et des
systèmes agronomiques. Pour Laura Centemeri, chargée de recherche au CNRS "en permaculture, il y a trois principes
fondateurs : prendre soin des humains, prendre soin de la terre, partager équitablement les ressources.".
Théorisée dans les années 1970 par les Australiens Bill Mollison (biologiste) et David Holmgren (essayiste), le terme
"permaculture" signifiait initialement "agriculture permanente" (de l'anglais "permanent agriculture") et faisait
explicitement référence à la conception de systèmes agricoles. À partir des années 1990, sous l'impulsion de David
Holmgren, il a été progressivement étendu pour signifier "culture de ce qui est permanent" dans le sens (sociologique) de
pérenne ou viable. Avec ce sens étendu, la permaculture peut être appliquée à d'autres domaines. La permaculture utilise entre
autres des notions d'écologie, de systémique, de paysage, d'agriculture biologique, d'agroécologie, de biomimétisme, d'éthique,
de philosophie et de pédologie. La permaculture invite à mettre ces aspects théoriques en relation avec les observations réalisées
sur le terrain de façon harmonieuse. Le terme est toutefois utilisé pour désigner la forme d'agriculture basée sur ces principes.`;
    private text3 = `Les Oiseaux (Aves) sont une classe de Vertébrés tétrapodes caractérisée par la bipédie, des ailes,
un plumage et un bec sans dents. Survivants de l'extinction Crétacé-Paléogène, les oiseaux modernes (Neornithes) sont les seuls
représentants actuels des dinosaures théropodes, tandis que tous les autres groupes de dinosaures sont éteints. Les crocodiliens
constituent aujourd’hui les plus proches parents des oiseaux.
L'histoire évolutive des oiseaux fait de ces animaux de petite taille apparus au Jurassique moyen les descendants directs des dinosaures
à plumes pourvus d'ailes, d'où leur position dans le clade des dinosaures. Les analyses cladistiques actuelles les lient aux dinosaures saurischiens,
parmi ceux-ci à l'ensemble des théropodes (carnivores bipèdes) et, parmi les nombreux sous-clades qui le composent, au groupe des coelurosauriens
Maniraptora. Au sein des maniraptoriens, tous les oiseaux sont rassemblés dans le clade des Avialae qui forme, avec ses deux groupes-frères, les
Troodontidae et les Dromaeosauridae, le groupe des Paraves (les "presque oiseaux"). La miniaturisation rapide de cette lignée de dinosaures à plumes,
en une cinquantaine de millions d’années, est probablement liée à l’évolution accélérée des nouveautés anatomiques (formation d’ailes et d’un plumage
complexe, fusion des clavicules en furcula, développement du sternum en bréchet essentiel au vol battu, redistribution de la masse du corps) qui leur
ont permis de coloniser de nouveaux habitats dans les arbres, sources de nourriture et abri contre les prédateurs.
S'il existe, en 2020-2021, autour de 10 7007 à 11 150 espèces d'oiseaux recensées (dont 9 700 espèces sauvages réunissant entre 50 et 430 milliards
d'individus, et dont plus de la moitié sont des passereaux), très différentes tant par leur écologie que par leurs comportements, chacune d'elles
présente un ensemble commun de caractéristiques évidentes permettant de les regrouper, en particulier des écailles cornées et des plumes, une
mâchoire sans dents enveloppée d'un étui corné formant un bec, une queue osseuse courte, des membres antérieurs transformés en ailes (fonctionnelles
ou non, cette caractéristique étant particulièrement rare chez les vertébrés) et des membres postérieurs qui servent seuls normalement à la progression
sur le sol ou dans l'eau. En outre, ils sont tous ovipares, c'est-à-dire qu'ils pondent des oeufs entourés d'une fine coquille dure,
et ils sont tous homéothermes permanents.`;
    private text4 = `Les plantes potagères sont des plantes comestibles cultivés dans des jardins potagers, en serre, dans l'eau, ou en plein champ.
Quatre familles jouent un rôle primordial pour les légumes : les Fabaceae (tous les légumes secs), les Solanaceae (tomates, poivrons et pommes de terre),
les Brassicaceae, (choux, navets et radis), et les cucurbitaceae (courges et courgettes), tandis que trois familles apportent la plupart
des herbes aromatiques : Apiaceae, Lamiaceae et Liliaceae.
Dans le tableau ci-dessous sont classées comme légumes les espèces qui se consomment plutôt salés et les fruits plutôt sucrés
généralement servis en dessert. Les "légumes" qui sont en termes de botanique des "fruits" sont en gras.
Les légumes-feuilles sont les légumes dont on consomme les feuilles, parfois seulement le limbe, la base des feuilles ou le pétiole.
Ce sont d'abord les salades de type endive, laitue, mâche, romaine, scarole ou autres, souvent accompagnées d'un assaisonnement du
fait de leur fadeur ou amertume naturelles, mais aussi le chou, l'épinard, l'oseille, et le céleri. Puis la base des feuilles
imbriquées chez le fenouil, ou le bas des feuilles serrées qui constituent une pseudo-tige chez le poireau. C'est le pétiole
transformé en carde qui est consommé chez la poirée tels la bette, le cardon ou la rhubarbe. Appartiennent aussi à cette catégorie
diverses sortes de légumes tropicaux dénommés brèdes.
Ce sont les légumes dont on consomme des parties de la tige, comme les jeunes pousses turions comme l'asperge, les pousses de bambous
ou la base de la tige comme la racine tubérisée du chou-rave ainsi que les bulbes des Amaryllidacées souvent aussi utilisés comme
condiments tels la ciboule, l'ail, l'échalote et l'oignon.
Consommés pour les inflorescences ou les fleurs en boutons, ce sont le chou-fleur, le brocoli, la câpre, ou bien le réceptacle floral
du jeune capitule tel l'artichaut, le Gundelia, et la fleur propement dite de courgette. Les fleurs de nombreuses espèces peuvent être consommées pour leur goût particulier ou leurs aspect décoratif comme la capucine.
Les légumes-racines sont représentés par la betterave, la carotte et le panais, le navet, le radis, le rutabaga, le salsifis, le scorsonère
et le cerfeuil tubéreux entre autres.
Les légumes-fruits sont consommés en tant que légumes, mais constituant le fruit ou organe portant les graines, au sens botanique, de la
plante tels l'avocat, la chayote, la courge, la courgette, le melon, l'olive, la pastèque, ou la tomate. À cette catégorie se rattachent aussi les gousses jeunes récoltées avant maturité comme le petit pois mange-tout ou les haricots verts tels les haricots verts filets ou aiguilles, filets-mangetout, mange-tout ou haricots verts plats et les fruits récoltés jeunes comme l'aubergine, le poivron/piment, le concombre/cornichon, les courges, le gombo...
Les tubercules sont des organes issus de la tubérisation de tiges souterraines. Ils se distinguent par leur forte teneur en glucides de réserve
(amidon ou inuline) tels la crosne du Japon, l'igname, l'oca du Pérou, la patate douce, la pomme de terre et le topinambour, entre autres.
Les fines herbes utilisées comme condiments et pour leurs arômes ne sont pas à proprement parler des légumes tels le basilic, le cerfeuil,
la ciboulette, l'estragon, le laurier, la menthe, le persil, le romarin et le thym entre autres.`;
    private texts = [this.text1, this.text2, this.text3, this.text4];
    constructor() { }

    get(index: number): string {
        return this.texts[index].replace(/\s+/g, ' ').replace('\n', ' ');
    }

    getRandom(): string {
        return this.get(this.getRandomInt(this.texts.length));
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }
}
