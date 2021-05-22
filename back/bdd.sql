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

create table itemListFactory
(
	idListFactory int,
	idItem int,

	qte int,
	pseudo varchar(100) DEFAULT "",

	primary key (idListFactory, idItem),

	foreign key (idListFactory) references listFactory (idListFactory),
	foreign key (idItem) references item (idItem)
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
(21, "Bae 45", 1, 1), (22, "Venom", 1, 1), (23, "Ignifist 30", 1, 1), (24, "Mounted Bonesaw", 2, 1), (25, "Bonesaw", 2, 1), (26, "Cremari Mortar", 3, 1), (27, "Cutler", 2, 1);

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
INSERT INTO item (idItem, nomItem, idType) VALUES (87, "Bandages", 7), (88, "Blood Plasma", 7), (89, "First Aid Kit", 7), (90, "Trauma Kit", 7);

-- item type ressource
INSERT INTO item (idItem, nomItem, idType) VALUES (91, "bMat", 8), (92, "Diesel", 8), (93, "Petrol", 8), (94, "rMat", 8), (95, "explosif", 8), (96, "heavy explosif", 8), (97, "concrete", 8), (98, "Aluminium", 8), (99, "Iron", 8); 
