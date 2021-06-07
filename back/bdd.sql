create database foxHole;

create table faction
(
	idFaction int AUTO_INCREMENT,
	nomFaction varchar(20),

	primary key (idFaction)
);

create table listFactory
(
	idListFactory int AUTO_INCREMENT,
	nomListFactory varchar(50),
	
	primary key(idListFactory)
);

create table typeItem
(
	idType int AUTO_INCREMENT,
	nomType varchar(50),

	primary key (idType)
);

create table depot
(
	idDepot int AUTO_INCREMENT,
	nomDepot varchar(100),
	codeDepot int,

	primary key (idDepot)
);

create table pseudo
(
	idPseudo int AUTO_INCREMENT,
	nomPseudo varchar(70),

	primary key(idPseudo)
);

create table item
(
	idItem int AUTO_INCREMENT,
	nomItem varchar(50),

	idType int,
	idFaction int DEFAULT 3,

	primary key (idItem),

	foreign key (idType) references typeItem (idType),
	foreign key (idFaction) references faction (idFaction)
);

create table recette
(
	idItem int,
	idItemRessource int,
	qteItem int,

	primary key (idItem, idItemRessource),

	foreign key (idItem) references item (idItem),
	foreign key (idItemRessource) references item (idItem)
);

create table pseudoItemFabriquer
(
	idPseudo int,
	idItem int,

	qte int,
	dateFabrique date,

	primary key (idPseudo, idItem),

	foreign key (idPseudo) references pseudo (idPseudo),
	foreign key (idItem) references item (idItem)
);

create table historiqueFabrique
(
	idPseudo int,
	idItem int,

	qte int,

	primary key (idPseudo, idItem),

	foreign key (idPseudo) references pseudo (idPseudo),
	foreign key (idItem) references item (idItem)
);

create table itemListFactory
(
	idListFactory int,
	idItem int,

	qte int,

	primary key (idListFactory, idItem),

	foreign key (idListFactory) references listFactory (idListFactory),
	foreign key (idItem) references item (idItem)
);

create table evenement
(
	idEvent int AUTO_INCREMENT,
	nomEvent varchar(50),
	descriptionEvent varchar(1000),
	dateHeureEvent datetime,

	primary key(idEvent)
);

create table listeItemEvent
(
	idEvent int,
	idItem int,
	qte int,

	primary key (idEvent, idItem),
	foreign key (idItem) references item (idItem),
	foreign key (idEvent) references evenement (idEvent)
);


INSERT INTO faction (idFaction, nomFaction) VALUES (1, "Colonials"), (2, "Wardens"), (3, "les deux");
INSERT INTO typeItem (idType, nomType) VALUES (1, "Arme"), (2, "Munitions"), (3, "Explosif"), (4, "Supplies"), (5, "Equipement"), (6, "véhicule"), (7, "medic"), (8, "ressource");

-- item type arme
INSERT INTO item (idItem, nomItem, idFaction, idType) VALUES 
(1, "fusil à pompe", 2, 1), 
(2, "pitch gun", 1, 1), (3, "Lionclaw", 1, 1), (4, "Fiddler Model 868", 2, 1), (5, "The liar", 2, 1),
(6, "Pistolet", 3, 1), 
(7, "Sniper", 3, 1), 
(8, "Dusk", 1, 1), (9, "Aalto storm", 2, 1), (10, "Booker storm", 2, 1),
(11, "Catara", 1, 1), 
(12, "Loughcaster", 2, 1), (13, "Argenti", 1, 1), (14, "Blakerow", 2, 1), (15, "Fuscina", 1, 1),
(16, "Daucus", 1, 1), 
(17, "fusil anti-char", 2, 1), 
(18, "Malone", 2, 1), (19, "KRN886-127 Gast", 1, 1),
(20, "Revolver", 3, 1),
(21, "Bane 45", 1, 1), (22, "Venom", 1, 1), (23, "Ignifist 30", 1, 1), (24, "Mounted Bonesaw", 2, 1), (25, "Bonesaw", 2, 1), (26, "Cremari Mortar", 3, 1), (27, "Cutler", 2, 1);

-- item type munition
INSERT INTO item (idItem, nomItem, idType) VALUES 
(28, "9mm", 2), (29, "cartouche", 2), (30, "8mm", 2), (31, "8.5mm", 2),  (32, "7.62mm", 2), (33, "7.92mm", 2), (34, "30mm", 2), (35, "13.5mm", 2), (36, "12.7mm", 2), (37,".44", 2), (38, "14.5mm", 2),
(39, "A.T.R.P.G shell", 2), (40, "A.T.R.P.G indirect shell", 2), (41, "Mortar shell", 2), (42, "Shrapnel shell", 2), (43, "Flare shell", 2),
(44, "120mm", 2), (45, "150mm", 2), (46, "250mm", 2), (47, "300mm", 2), (48, "40mm", 2), (49, "68mm", 2), (50, "R.P.G shell", 2);

-- item type explosif
INSERT INTO item (idItem, nomItem, idFaction, idType) VALUES (51, "Flask Grenade", 2, 3), (52, "Sticky Bomb", 3, 3), (53, "Abisme", 3, 3), (54, "Hydra's Whisper", 1, 3), (55, "Alligator Charge", 3, 3), (56, "Gas Grenade", 3, 3), (57, "Bomastone", 2, 3), (58, "Frag Grenade", 1, 3), (59, "Mammon", 3, 3), (60, "Smoke Grenade", 3, 3), (61, "Warhead", 3, 3);

-- item type supplies
INSERT INTO item (idItem, nomItem, idType) VALUES (62, "Bunker Supplies", 4), (63, "Garrison Supplies", 4), (64, "Soldier Supplies", 4);

-- item type equipement
INSERT INTO item (idItem, nomItem, idType) VALUES (65, "Binoculars", 5), (66, "Gas Mask Filter", 5), (67, "Gas Mask", 5), (68, "Radio Backpack", 5), (69, "Radio", 5), (70, "Pelle", 5), (71, "Sledge Hammer", 5), (72, "Tripod", 5), (73, "Wrench", 5);

-- item type vehicule
INSERT INTO item (idItem, nomItem, idFaction, idType) VALUES 
(74, "Devitt", 2, 6), (75, "Hatchet", 1, 6), (76, "Kranesca", 1, 6), (77, "Pelekys", 1, 6), (78, "Devitt Ironhide", 2, 6), (79, "Devitt-Caine", 2, 6),
(80, "Silverhand", 2, 6), (81, "Falchion", 1, 6), (82, "Spatha", 1, 6),
(83, "Battering Ram", 1, 6), (84, "Collins Cannon", 2, 6);

-- item type medic
INSERT INTO item (idItem, nomItem, idType) VALUES (85, "Bandages", 7), (86, "Blood Plasma", 7), (87, "First Aid Kit", 7), (88, "Trauma Kit", 7);

-- item type ressource
INSERT INTO item (idItem, nomItem, idType) VALUES (89, "bMat", 8), (90, "Diesel", 8), (91, "Petrol", 8), (92, "rMat", 8), (93, "poudre explosive", 8), (94, "heavy explosif", 8), (95, "concrete", 8), (96, "Aluminium", 8), (97, "Iron", 8); 

-- recette armes
INSERT INTO recette (idItem, idItemRessource, qteItem) VALUES 
(1, 89, 120), 
(2, 89, 80), (3, 89, 120), (4, 89, 120), (5, 89, 120), 
(6, 89, 60), 
(7, 89, 200), (7, 92, 15),
(8, 89, 165), (9, 89, 165), (10, 89, 165),
(11, 89, 165),
(12, 89, 100), (13, 89, 100), (14, 89, 140), (15, 89, 140),
(16, 89, 150),
(17, 89, 150),
(18, 92, 30), (19, 92, 30),
(20, 92, 60),
(21, 89, 150), (21, 92, 45), (22, 89, 100), (22, 92, 25), (23, 89, 60), (23, 93, 50), (24, 89, 200), (25, 89, 100), (25, 92, 25), (26, 89, 100), (26, 92, 25), (27, 89, 100), (27, 92, 25);

-- recette munition
INSERT INTO recette (idItem, idItemRessource, qteItem) VALUES 
(28, 89, 80), (29, 89, 80), (30, 89, 40), (31, 89, 150), (32, 89, 80), (33, 89, 120), (34, 89, 80), (34, 92, 20), (35, 89, 100), (36, 89, 100), (37, 89, 40), (38, 89, 100),
(39, 89, 60), (39, 93, 75), (40, 89, 60), (40, 93, 75), (41, 89, 60), (41, 93, 35), (42, 89, 60), (42, 93, 15), (43, 89, 60), (43, 93, 10), (44, 89, 60), (44, 93, 15),
(45, 89, 120), (45, 94, 10), (46, 89, 120), (46, 94, 25), (47, 89, 135), (47, 94, 30), (48, 89, 160), (48, 93, 120), (49, 89, 120), (49, 93, 120), (50, 89, 60), (50, 93, 75);

-- reccette explosif
INSERT INTO recette (idItem, idItemRessource, qteItem) VALUES 
(51, 89, 100), (51, 93, 50), (52, 89, 50), (52, 93, 50), (53, 89, 100), (53, 93, 10), (54, 89, 100), (54, 93, 40), (55, 89, 100), (55, 94, 15), (56, 89, 140),
(57, 89, 100), (57, 93, 20), (58, 89, 100), (58, 93, 20), (59, 89, 100), (59, 93, 10), (60, 89, 120), (61, 92, 200), (61, 94, 1000);

-- recette supplies
INSERT INTO recette (idItem, idItemRessource, qteItem) VALUES 
(62, 89, 75), (63, 89, 75), (64, 89, 80);

-- recette equipement
INSERT INTO recette (idItem, idItemRessource, qteItem) VALUES 
(65, 89, 160), (66, 89, 100), (67, 89, 160), (68, 89, 150), (69, 89, 100), (70, 89, 200), (71, 89, 200), (72, 89, 100), (73, 89, 75);

-- recette vehicule
INSERT INTO recette (idItem, idItemRessource, qteItem) VALUES 
(74, 92, 140), (75, 92, 135), (76, 92, 145), (77, 92, 145), (78, 92, 160), (79, 92, 150), (80, 92, 170), (81, 92, 165), (82, 92, 165), (83, 92, 30), (84, 92, 30);

-- recette medic
INSERT INTO recette (idItem, idItemRessource, qteItem) VALUES 
(85, 89, 160), (86, 89, 80), (87, 89, 60), (88, 89, 80);