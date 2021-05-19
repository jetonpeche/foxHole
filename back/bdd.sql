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

create table munition
(
	idMunition int not null AUTO_INCREMENT,
	nomMunition varchar(50),

	primary key(idMunition)
);

create table ressource
(
	idRessource int AUTO_INCREMENT,
	nomRessource varchar(50),

	primary key(idRessource)
);

create table equipement
(
	idEquipement int AUTO_INCREMENT,
	nomEquipement varchar(50),

	primary key (idEquipement)
);

create table medic
(
	idMedic int AUTO_INCREMENT,
	nomMedic varchar(50),

	primary key (idMedic)
);

create table supplie
(
	idSupplie int AUTO_INCREMENT,
	nomSupplie varchar(50),

	primary key (idSupplie)
);

create table explosif
(
	idExplosif int AUTO_INCREMENT,
	nomExplosif varchar(50),
	idFaction int DEFAULT null,

	primary key(idExplosif),
	foreign key (idFaction) references faction(idFaction)
);

create table vehicule
(
	idVehicule int AUTO_INCREMENT,
	nomVehicule varchar(50),

	idFaction int DEFAULT null,

	primary key (idVehicule),
	foreign key (idFaction) references faction(idFaction)
);

create table arme
(
	idArme int not null AUTO_INCREMENT,
	nomArme varchar(50),
	idFaction int DEFAULT NULL, -- 1: colonial, 2: wardern

	primary key (idArme),
	foreign key (idFaction) references faction(idFaction)
);

create table listObj
(
	idListObj int AUTO_INCREMENT,
	idListFactory int not null,

	idArme int DEFAULT null,
	idExplosif int DEFAULT null,
	idEquipement int DEFAULT null,
	idRessource int DEFAULT null,
	idVehicule int DEFAULT null,
	idSupplie int DEFAULT null, 
	idMedic int DEFAULT null,

	qte varchar(2),
	pseudo varchar(50),

	primary key (idListObj),

	foreign key (idListFactory) references listFactory (idListFactory),
	foreign key (idArme) references arme (idArme),
	foreign key (idExplosif) references explosif (idExplosif),
	foreign key (idEquipement) references equipement (idEquipement),
	foreign key (idRessource) references ressource (idRessource),
	foreign key (idVehicule) references vehicule (idVehicule),
	foreign key (idSupplie) references supplie (idSupplie),
	foreign key (idMedic) references medic (idMedic)
);

INSERT INTO faction (idFaction, nomFaction) VALUES (1, "Colonials"), (2, "Wardens");
INSERT INTO listFactory(idListFactory, nomListFactory) VALUES (1, "Arme"), (2, "Munitions"), (3, "Explosif") (4, "Supplies"), (5, "Equipement"), (6, "véhicule");

INSERT INTO equipement (idEquipement, nomEquipement) VALUES (1, "Binoculars"), (2, "Gas Mask Filter"), (3, "Gas Mask"), (4, "Radio Backpack"), (5, "Radio"), (6, "Pelle"), (7, "Sledge Hammer"), (8, "Tripod"), (9, "Wrench");
INSERT INTO medic (idMedic, nomMedic) VALUES (1, "Bandages"), (2, "Blood Plasma"), (3, "First Aid Kit"), (4, "Trauma Kit");
INSERT INTO supplie (idSupplie, nomSupplie) VALUES (1, "Bunker Supplies"), (2, "Garrison Supplies"), (3, "Soldier Supplies");
INSERT INTO ressource (idRessource, nomRessource) VALUES (1, "bMat"), (2, "Diesel"), (3, "Petrol"), (4, "rMat"), (5, "explosif"), (6, "heavy explosif"), (7, "concrete"), (8, "Aluminium"), (9, "Iron"); 

INSERT INTO explosif (idExplosif, nomExplosif) VALUES (1, "Flask Grenade", 2), (2, "Sticky Bomb"), (3, "Abisme"), (4, "Hydra's Whisper", 1), (5, "Alligator Charge"), (6, "Gas Grenade"), (7, "Bomastone", 2), (8, "Frag Grenade", 1), (9, "Mammon"), (10, "Smoke Grenade"), (11, "Warhead");

INSERT INTO arme (idArme, nomArme, factionArme) VALUES 
(1, "fusil à pompe", 2), 
(2, "pitch gun", 1), (3, "Lionclaw", 1), (4, "Fiddler Model 868", 2), (5, "The liar", 2),
(6, "Pistolet", 3), 
(7, "Sniper"), 
(8, "Dusk", 1), (9, "Aalto storm", 2), (10, "Booker storm", 2),
(11, "Catara", 1), 
(12, "Loughcaster", 2), (13, "Argenti", 1), (14, "Blakerow", 2), (15, "Fuscina", 1),
(16, "Daucus", 1), 
(17, "fusil anti-char", 2), 
(18, "Malone", 2), (19, "KRN886-127 Gast", 1),
(20, "Revolver"),

(21, "Bae 45", 1), (22, "Venom", 1), (23, "Ignifist 30", 1), (24, "Mounted Bonesaw", 2), (25, "Bonesaw", 2), (26, "Cremari Mortar"), (27, "Cutler", 2);

INSERT INTO munition (idMunition, nomMunition) VALUES 
(1, "9mm"), (2, "cartouche"), (3, "8mm"), (4, "8.5mm"),  (5, "7.62mm"), (6, "7.92mm"), (7, "30mm"), (8, "13.5mm"), (9, "12.7mm"), (10,".44"), (11, "14.5mm"),
(11, "A.T.R.P.G shell"), (12, "A.T.R.P.G indirect shell"), (13, "Mortar shell"), (14, "Shrapnel shell"), (15, "Flare shell"),
(16, "120mm"), (17, "150mm"), (18, "250mm"), (19, "300mm"), (20, "40mm"), (21, "68mm"), (22, "R.P.G shell");

INSERT INTO vehicule (idVehicule, nomVehicule, idFaction) VALUES 
(1, "Devitt", 2), (2, "Hatchet", 1), (3, "Kranesca", 1), (4, "Pelekys", 1), (5, "Devitt Ironhide", 2), (6, "Devitt-Caine", 2),
(7, "Silverhand", 2), (8, "Falchion", 1), (9, "Spatha", 1),
(10, "Battering Ram", 1), (11, "Collins Cannon", 2);