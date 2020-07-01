--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Raspbian 11.7-0+deb10u1)
-- Dumped by pg_dump version 11.7 (Raspbian 11.7-0+deb10u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: barcodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.barcodes (
    id integer NOT NULL,
    barcode text
);


ALTER TABLE public.barcodes OWNER TO postgres;

--
-- Name: barcodes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.barcodes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.barcodes_id_seq OWNER TO postgres;

--
-- Name: barcodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.barcodes_id_seq OWNED BY public.barcodes.id;


--
-- Name: drafts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.drafts (
    id integer NOT NULL,
    request_date timestamp with time zone,
    reader_name text,
    book_title text,
    comment text
);


ALTER TABLE public.drafts OWNER TO postgres;

--
-- Name: drafts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.drafts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.drafts_id_seq OWNER TO postgres;

--
-- Name: drafts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.drafts_id_seq OWNED BY public.drafts.id;


--
-- Name: in_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.in_requests (
    pib_number integer,
    borrowing_library text,
    request_date timestamp with time zone,
    loan_library text,
    reader_name text,
    book_title text,
    book_author_firstname text,
    book_author_name text,
    cdu text,
    out_province boolean,
    barcode text
);


ALTER TABLE public.in_requests OWNER TO postgres;

--
-- Name: out_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.out_requests (
    pib_number integer,
    borrowing_library text,
    request_date timestamp with time zone,
    loan_library text,
    book_title text,
    book_author_firstname text,
    book_author_name text,
    cdu text,
    out_province boolean
);


ALTER TABLE public.out_requests OWNER TO postgres;

--
-- Name: readers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.readers (
    name text,
    email text,
    gender text
);


ALTER TABLE public.readers OWNER TO postgres;

--
-- Name: barcodes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.barcodes ALTER COLUMN id SET DEFAULT nextval('public.barcodes_id_seq'::regclass);


--
-- Name: drafts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drafts ALTER COLUMN id SET DEFAULT nextval('public.drafts_id_seq'::regclass);


--
-- Data for Name: barcodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.barcodes (id, barcode) FROM stdin;
2	13609100000023
3	13609100000031
4	1360910000004X
5	13609100000058
6	13609100000066
7	13609100000074
8	13609100000082
9	13609100000090
10	13609100000104
11	13609100000112
12	13609100000120
13	13609100000139
14	13609100000147
15	13609100000228
16	13609100000236
17	13609100000244
18	13609100000252
19	13609100000260
20	13609100000279
21	13609100000287
22	13609100000295
23	13609100000309
24	13609100000317
25	13609100000325
26	13609100000333
27	13609100000155
28	13609100000163
29	13609100000171
30	1360910000018X
31	13609100000198
32	13609100000201
33	1360910000021X
34	13609100000341
35	1360910000035X
36	13609100000368
37	13609100000376
38	13609100000384
39	13609100000392
40	13609100000406
41	13609100000414
42	13609100000422
43	13609100000430
44	13609100000449
45	13609100000457
46	1360910000052X
47	13609100000538
48	13609100000546
49	13609100000570
50	13609100000554
51	13609100000562
52	13609100000465
53	13609100000473
54	13609100000481
55	1360910000049X
56	13609100000503
57	13609100000511
58	13609100000821
59	1360910000083X
60	13609100000848
61	13609100000856
62	13609100000864
63	13609100000872
64	13609100000880
65	13609100000899
66	13609100000902
67	13609100000910
68	13609100000929
69	13609100000937
70	13609100000643
71	13609100000651
72	1360910000066X
73	13609100000678
74	13609100000686
75	13609100000694
76	13609100000015
\.


--
-- Data for Name: drafts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.drafts (id, request_date, reader_name, book_title, comment) FROM stdin;
1	2020-06-26 02:00:00+02	Prumont, Florence	Naufrage	Auteur : BORDES, Gilbert
2	2020-07-01 02:00:00+02	Maes, Carine	Soeurs	Auteur, Bernard Minier\n\nBibliothèque de Rixensart
\.


--
-- Data for Name: in_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.in_requests (pib_number, borrowing_library, request_date, loan_library, reader_name, book_title, book_author_firstname, book_author_name, cdu, out_province, barcode) FROM stdin;
\.


--
-- Data for Name: out_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.out_requests (pib_number, borrowing_library, request_date, loan_library, book_title, book_author_firstname, book_author_name, cdu, out_province) FROM stdin;
\.


--
-- Data for Name: readers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.readers (name, email, gender) FROM stdin;
Maes, Carine	mailto:carine.maes@hotmail.be	féminin
Deboutte, Jules		masculin
Fockedey, Etienne	mailto:baire_patricia@hotmail.com	masculin
Baire, Patricia	mailto:baire_patricia@hotmail.com	féminin
Fockedey, Noémie		féminin
Fockedey, Jérémy		masculin
Fockedey, Théo		masculin
Henrard, Françoise	mailto:henrard_francoise@voo.be	féminin
Alin, Carine	mailto:ca-riine@hotmail.com	féminin
Hupé, Michaël	mailto:ca-riine@hotmail.com	masculin
Hupé, Andy		masculin
BOLLINNE, Françoise	mailto:fr.bollinne@gmail.com	
Bourtembourg, Alix	mailto:laurent.btbg@gmail.com	féminin
Bourtembourg, Fanny	mailto:laurent.btbg@gmail.com	féminin
Lommers, Anne	mailto:laurent.btbg@gmail.com	féminin
Bourguignon, Cécile		féminin
Buret, Lucien	mailto:lucien@buret.be	masculin
Buret, Louis	mailto:lb270799@gmail.com	masculin
Hébette, Marie-Anne	mailto:hebettem@yahoo.fr	féminin
Chenot, Jean-François	mailto:jf_chenot@hotmail.com	masculin
Pirmez, Céline	mailto:celinepirmez@hotmail.com	féminin
Chenot, Oriane	mailto:jf_chenot@hotmail.com	féminin
Dandoy, Marie	mailto:mgillion@voo.be	féminin
Gillion, Augustin	mailto:mgillion@voo.be	masculin
Gillion, Théodore	mailto:mgillion@voo.be	masculin
Gillion, Elise	mailto:mgillion@voo.be	féminin
Dehareng, Sylvie	mailto:deharengsylvie@gmail.com	féminin
Delinte, Sabine	mailto:sabine.delinte@gmail.com	féminin
De Ketele, Roger	mailto:rdeketele@gmail.com	masculin
De Soete, Godelieve	mailto:godelieve.desoete@gmail.com	féminin
Gardiman, Catherine	mailto:catherine.gardiman@gmail.com	féminin
De Callatay, Véronique	mailto:vdecallatay@hotmail.com	féminin
De le Hoye, Géraldine	mailto:geraldine.delehoye@gmail.com	féminin
Janssen, Philippe	mailto:phj9@skynet.be	masculin
Janssen, Clarisse	mailto:janssen.clarisse@gmail.com	féminin
Josse, Marika	mailto:reiyelakiram@skynet.be	féminin
Gérards, Olivier	mailto:ol.gerards@gmail.com	masculin
De Backer, Fabienne	mailto:debacker.fa@gmail.com	féminin
Gérards, Cyprien		masculin
Gérards, Dorian		masculin
Gérards, Lucie		féminin
Gérards, Baptiste		masculin
Josse, Yvonne		féminin
Latour, Robert	mailto:leliabauret@gmail.com	masculin
Thiry, Stéphane	mailto:stkdm@brutele.be	masculin
Moerkerke, Gabrielle		féminin
Moinil, Nathalie	mailto:moinil.carlier@gmail.com	féminin
Carlier, Fanny		féminin
Carlier, Sarah		féminin
Polomé, Michèle	mailto:mi.polome@gmail.com	féminin
Rampelberg, Christine	mailto:soframpy@hotmail.com	féminin
Collard, Marie	mailto:marie@rigatti.net	féminin
Chevolet, Marie-Elise	mailto:me.chevolet@casterman.com	féminin
de Wilde, Anne-Frédérique	mailto:af.dewilde@gmail.com	féminin
Van Oppens, Xavier	mailto:xva@rtbf.be	masculin
Gilson, Lucas		masculin
Gilson, Chloé		féminin
Ketels, Vanessa	mailto:vketels@hotmail.com	féminin
Devlamijnck, Sophie Vinciane	mailto:sophiedvlk@hotmail.com	féminin
Anckaert, Anne-France	mailto:annefrance.anckaert@gmail.com	féminin
Piqueray, Michel	mailto:piqueraymichel@gmail.com	masculin
Kieffer, Bénédicte	mailto:desmetbenedicte@yahoo.fr	féminin
Senterre, Anne-Françoise	mailto:afsenterre@gmail.com	féminin
Cornelis, Magali	mailto:magrachel26@hotmail.fr	féminin
Tabourdon, Fanny	mailto:fanny0704@live.be	féminin
Vandennieuwenhuysen, Muriel	mailto:muvdnh@gmail.com	féminin
Van Beethoven, Luna		féminin
Van Beethoven, Enzo		masculin
Vanoost, Thérèse		féminin
Wyns, Muriel	mailto:dm.vogelaere@skynet.be	féminin
Van Ingelgem, Muriel	mailto:murieldeudon@gmail.com	féminin
Thys, Nelly		féminin
Meessen, Martine	mailto:martinemeessen@yahoo.fr	féminin
Parant, Valérie	mailto:valerieparant@msn.com	féminin
Francke, Betty Grace	mailto:franckebetty@gmail.com	féminin
Goenen, Florence	mailto:florencegoenen@yahoo.fr	féminin
Moureau, Géraldine	mailto:grenadinegm27@hotmail.com	féminin
Sartiaux, Philippe	mailto:nadphilsartiaux@gmail.com	masculin
Martin, Mireille	mailto:choubiss@gmail.com	féminin
Paquet, Olivier	mailto:olivierpaquet78@gmail.com	masculin
Hammadi, Fouad	mailto:khadramo@yahoo.fr	masculin
Lambrechts, Isabelle	mailto:isa.lambrechts@hotmail.com	féminin
Dupont, Stéphanie	mailto:stephanie.deliege@uclouvain.be	féminin
Bonnarens, Isaline	mailto:horseslove2017@gmail.com	féminin
Bonnet, Valérie	mailto:audreyvalerie@hotmail.com	féminin
Moneib, Michèle	mailto:michele.moneib@gmail.com	féminin
Hallaux, Laurence	mailto:superlolinette@yahoo.fr	féminin
Micheau, Nicolas	mailto:cindy.galle@yahoo.fr	masculin
Cattelain, Christian	mailto:mnvielvoye@gmail.com	masculin
Borgniet, Pierre	mailto:pierreborgniet17@gmail.com	masculin
Van den Durpel, Pierre	mailto:pierre@totavita.com	masculin
Pirard, Anne	mailto:apirard01@gmail.com	féminin
Kervyn, Dominique	mailto:dominique.kervyn@skynet.be	féminin
Geeraert, Yvan	mailto:ygeeraert@yahoo.fr	masculin
Dewandre, Noa	mailto:exchams1987@hotmail.com	masculin
Stoufs, Lidwine	mailto:lidwine.stoufs@gmail.com	féminin
Nachtergaele, Jean-Claude	mailto:jcl_nach@hotmail.com	masculin
Lescrenier, Laurence	mailto:pamplemousseld@yahoo.com	féminin
Losseau, Claire	mailto:clairelosseau@hotmail.com	féminin
Roland, André	mailto:roland-wouters@hotmail.com	masculin
Eugène, Anne	mailto:anne_eug@hotmail.com	féminin
Joly, Charlotte	mailto:charlotte.dethaye@gmail.com	féminin
Ducarme, Philippe	mailto:chloebehets@gmail.com	masculin
Billiet, Véronique	mailto:billiet_veronique@hotmail.com	féminin
Dupire, Marie-Ange	mailto:madupire@outlook.com	féminin
Lindelauf, Valérie	mailto:valerie-schmit@hotmail.com	féminin
Tasiaux, Annick	mailto:annicktasiaux@hotmail.com	féminin
Marissael, Natacha	mailto:natacha_marissael@hotmail.com	féminin
Hance, Brigitte	mailto:brigittehance@yahoo.fr	féminin
VANHEES, Jean-Louis	mailto:vanheesjl@gmail.com	masculin
Pierre, Nathalie	mailto:nathalie_pierre@hotmail.com	féminin
Mertens, Philippe	mailto:ph.mertens@yahoo.fr	masculin
Langbeen, Henri	mailto:langbeen.henri@live.be	masculin
MORSOMME, Marie	mailto:marie.morsomme@live.be	féminin
MORSOMME, Zoé	mailto:pierremorsomme@skynet.be	féminin
Morsomme, Martin	mailto:pierremorsomme@skynet.be	masculin
PRUMONT, Florence	mailto:pierremorsomme@skynet.be	féminin
Morsomme, Pierre	mailto:pierremorsomme@skynet.be	masculin
Pironet, Sonia	mailto:pelican.1973@hotmail.com	féminin
MORSOMME, François	mailto:pierremorsomme@skynet.be	masculin
Davoine, Marie-Claire	mailto:mcdavoine@yahoo.fr	féminin
Darte, Frédéric	mailto:fred-darte@hotmail.com	masculin
Thiry, Florence	mailto:thiflore1@gmail.com	féminin
Thil, Marie-Anne	mailto:ma.thil@skynet.be	féminin
Geerinckx, Laurence	mailto:lgeerinckx@yahoo.fr	féminin
De Saint-Hubert, Charlotte	mailto:chdesainthubert@hotmail.com	féminin
Duriez, Caroline	mailto:tangara-caro@hotmail.com	féminin
Calin, Françoise	mailto:fracalin@outlook.be	féminin
Philippart, Jeannine	mailto:jeannjardon@gmail.com	féminin
De Backer, Clémence	mailto:pgeeraerts@outlook.be	féminin
Gosset, Patricia	mailto:p-gosset@hotmail.com	féminin
Cardona, Jean	mailto:raucent@gmail.com	masculin
Delforge, Cédrine	mailto:cedrinedel@hotmail.com	féminin
Inferrera, Maria	mailto:infermaria@gmail.com	féminin
Pronce, Philippe	mailto:phil.pronce@skynet.be	masculin
PRONCE, Estelle	mailto:phil.pronce@skynet.be	féminin
Pronce, Coralie	mailto:phil.pronce@skynet.be	féminin
Bergans, Tom	mailto:elisa_bergans@yahoo.fr	masculin
CHARLIER, Catherine	mailto:catherine_ch@live.be	féminin
Quoirin, Charlotte	mailto:charlotte.quoirin@gmail.com	féminin
Draps, Danielle	mailto:drapsd@gmail.com	féminin
Domken, Sophie	mailto:sophdomken5@hotmail.com	féminin
Vanderieck, Karin	mailto:k.vanderieck@hotmail.com	féminin
Marchal, Marie	mailto:m.marchal.lust@gmail.com	féminin
Broucke, Michèle	mailto:michelebroucke@gmail.com	féminin
Vantilborgh, Valérie	mailto:mercredi56@hotmail.com	féminin
Michiels, Pauline	mailto:paulinemichiels@gmail.com	féminin
Stoefs, Marie-Hélène	mailto:mh.stoefs@hotmail.com	féminin
Schorils, Murielle	mailto:murielle.schorils@skynet.be	féminin
Martegani, Anne	mailto:anne.martegani@gmail.com	féminin
Perbal, Nicole	mailto:nicoleperbal@gmail.com	féminin
Léonard, Bernadette	mailto:leonardbernadette@live.be	féminin
Vanden Rhijn, Mireille	mailto:mireillevdr@gmail.com	féminin
Lapsin, Frederic	mailto:sophieslits@hotmail.com	masculin
Colasse, Sarah	mailto:sarahcolasse@hotmail.com	féminin
WILLEMART, Marie-Christine	mailto:willemartmc@gmail.com	féminin
De Briey, Laurent	mailto:florencegoenen@yahoo.fr	masculin
Jauquet, Bernadette	mailto:bernadette.jauquet@skynet.be	féminin
Leroy, Joséphine		féminin
Flabat, Jean-Pierre	mailto:jean-pierre.flabat@brutele.be	masculin
Thorembais-les-Béguines - Ecole communale - 1ere maternelle	mailto:vermeirendemeu@hotmail.com	
Thorembais-Saint-Trond - Ecole communale - 6e primaire	mailto:ec.farandole@gmail.com	
Ceuppens, Vincent	mailto:vincent.ceuppens@gmail.com	masculin
Felten, Catherine	mailto:catherine.felten@gmail.com	féminin
Rheinhard, Sara	mailto:rheinhardsara@hotmail.com	féminin
Zaleski, Mallorie	mailto:mallozal@hotmail.com	féminin
de Biolley, Véronique	mailto:veronique.daspremont@gmail.com	féminin
Lajoie, Sophie	mailto:solajoieso@gmail.com	féminin
Masset, Viviane	mailto:viviane.masset@hotmail.com	féminin
Vermout, Michel	mailto:vermout@skynet.be	masculin
Leveque, Bérangère	mailto:berangerebernard@gmail.com	féminin
Bertrand, Véronique	mailto:veronique.bertrand@skynet.be	féminin
Baonville, Caroline	mailto:baonville.caroline@gmail.com	féminin
Fadeur, Chrysta	mailto:chrysta_fadeur@live.be	féminin
Mathet, Anne-Sophie	mailto:annesophie5@hotmail.com	féminin
Vercoille, Henri		féminin
Andries, Priscilla	mailto:priscilla.dehennin@skynet.be	féminin
Van Mansart, Julie	mailto:meunierjuly@hotmail.com	féminin
Heuts, Pamela	mailto:pamela.heuts@gmail.com	féminin
Labourse, Marthe		féminin
Animômes - Malèves	mailto:fct62@hotmail.com	
Zicot, Bénédicte	mailto:benezw@hotmail.com	féminin
De Bauw, Dominique	mailto:doblake@hotmail.com	féminin
PARDONGE, Evelyne	mailto:evelyne.pardonge@hotmail.com	féminin
Stroobants, Valérie	mailto:valeriestroobants7@gmail.com	féminin
Barras, Cathy	mailto:cathybarras.cb@gmail.com	féminin
Nkurunziza, Evelyne	mailto:evelynenkurunziza78@gmail.com	féminin
JADOT, Clémence	mailto:julie.angelroth@gmail.com	féminin
Angelroth, Julie	mailto:julie.angelroth@gmail.com	féminin
Body, Christophe	mailto:christophe.body@hotmail.com	masculin
Mulligan, Marie Anne	mailto:marie.mulli@hotmail.com	féminin
Bontems, Christophe	mailto:tophebontems@hotmail.com	masculin
Van Parys, Fanny	mailto:fanny.vanparys@gmail.com	féminin
Jacquemain, Apolline	mailto:fanny.vanparys@gmail.com	féminin
Stordeur, Marie-France	mailto:mfstordeur@hotmail.com	féminin
Pignon, Charlotte	mailto:chapignon@gmail.com	féminin
Dioffo, Zeinabou	mailto:dioffozeinabou@gmail.com	féminin
Willems, Ysaline	mailto:annoye_valerie@hotmail.com	féminin
Balzat, Amélie	mailto:rolandbalzat@hotmail.com	féminin
Delitte, Diego	mailto:oliviabidoul@hotmail.com	masculin
Bocken, Raphaël	mailto:xab.ads@gmail.com	masculin
Bocken, Anaïs	mailto:xab.ads@gmail.com	féminin
Vandamme, Marie-Astrid	mailto:marieastrid86@hotmail.com	féminin
Haulotte, Dominique	mailto:dommanu2@hotmail.com	féminin
DECLOUX, Romain	mailto:dommanu2@hotmail.com	masculin
Body, Julien	mailto:christophe.body@hotmail.com	masculin
Body, Lise	mailto:christophe.body@hotmail.com	féminin
Body, Hugo	mailto:christophe.body@hotmail.com	masculin
Thomas, Elise	mailto:sylvies.bosmans@gmail.com	masculin
Thomas, Simon	mailto:sylvie.bosmans@gmail.com	masculin
Thomas, Margaux	mailto:sylvie.bosmans@gmail.com	féminin
Rigatti, Aline	mailto:marie@rigatti.net	féminin
Rigatti, Loïc	mailto:marie@rigatti.net	masculin
Barbier, Benjamin	mailto:cstephanie3@hotmail.com	masculin
Userstam, Vanessa	mailto:vanes655@hotmail.be	féminin
Wiliquet, Sarah	mailto:sarahwiliquet@gmail.com	féminin
Cassaert, Kiswantee	mailto:rekha7212@gmail.com	féminin
Berwart, Christiane		féminin
Van Herrewegen, Victoria	mailto:vanes655@hotmail.be	féminin
Van Herrewegen, Lucas	mailto:vanes655@hotmail.be	masculin
Van Herrewegen, Melissa	mailto:vanes655@hotmail.be	féminin
Montoisy, Aurélie	mailto:aureliemontoisy@gmail.com	féminin
Bataille, Anaïs	mailto:vanessa.pilette@gmail.com	féminin
Bataille, Léo	mailto:vanessa.pilette@gmail.com	masculin
Bataille, Thibault	mailto:vanessa.pilette@gmail.com	masculin
Henroul, Marion	mailto:sarahwiliquet@gmail.com	féminin
Henroul, Elisa	mailto:sarahwiliquet@gmail.com	féminin
Lavoie, Isaline	mailto:sarahwiliquet@gmail.com	féminin
Castreuil, Matéo	mailto:familleana@hotmail.com	masculin
Castreuil, Melissa	mailto:familleana@hotmail.com	féminin
Fadeur, Mathilde	mailto:mathildefadeur@gmail.com	féminin
De Maet, Yara	mailto:elisabeth.crespin@gmail.com	féminin
De Maet, Iris	mailto:elisabeth.crespin@gmail.com	féminin
Delsemme, Manon	mailto:manondelsemme1205@gmail.com	féminin
Lysy, Camille	mailto:c_lysy@yahoo.fr	féminin
Mujinga, Fara	mailto:farah-mja@hotmail.com	féminin
Cucuiet, David	mailto:cucuietcris@yahoo.com	masculin
Cucuiet, Nathalie	mailto:cucuietcris@yahoo.com	féminin
Roger, Marie-Jeanne	mailto:mariejroger@hotmail.com	féminin
Lecocq, Elodie	mailto:lecocqelo@hotmail.fr	féminin
Jacquin, Odile	mailto:c_lysy@yahoo.fr	féminin
Jacquin, Léopold	mailto:c_lysy@yahoo.fr	masculin
Deville, Murielle	mailto:murielledeville@gmail.com	féminin
Martin, Agnès	mailto:agnes.martin@brutele.be	féminin
Hennuy, Mathis	mailto:hennuy.rafael@gmail.com	masculin
Huybrechts, Luna	mailto:gonzamel8012@hotmail.com	féminin
Huybrechts, Noé	mailto:gonzamel8012@hotmail.com	masculin
Colinet, Lola	mailto:farah-mja@hotmail.com	féminin
Colinet, Thomas	mailto:farah-mja@hotmail.com	masculin
Bastin, Huguette	mailto:huguette@bastin.info	féminin
Gumustekin, Metin	mailto:metin-gumustekin@hotmail.com	masculin
Paxinos, Nelly	mailto:nelepaxinou@hotmail.com	féminin
Dinjart, Rose	mailto:mariedanvoye@yahoo.fr	féminin
Dinjart, Luisa	mailto:mariedanvoye@yahoo.fr	féminin
de Briey, Aurian	mailto:florencegoenen@yahoo.fr	masculin
de Briey, Mazarine	mailto:florencegoenen@yaoo.fr	féminin
de Briey, Laetitia	mailto:florencegoenen@yahoo.fr	féminin
de Briey, Igor	mailto:florencegoenen@yahoo.fr	masculin
Maes, Aymeric	mailto:vdecallatay@hotmail.com	masculin
Maes, Corentin	mailto:vdecallatay@hotmail.com	masculin
de Marneffe, Magali	mailto:ilagam56@hotmail.com	féminin
Hynderick, Lucie	mailto:murielledeville@gmail.com	féminin
Hynderick, Sara	mailto:murielledeville@gmail.com	féminin
Hynderick, Carine	mailto:murielledeville@gmail.com	féminin
Goffioul, Marie-Line	mailto:mlgoffioul@gmail.com	féminin
Janssens, Julie	mailto:jujanssens@hotmail.com	féminin
Vandermotten, Yannis	mailto:lecocqelo@hotmail.fr	masculin
Gumustekin, Melodi Aysegul	mailto:metin-gumustekin@hotmail.com	féminin
Noël, Véronique	mailto:noel.veronique1905@gmail.com	féminin
Wolfs, Isabelle	mailto:isabelle.wolfs@gmail.com	féminin
Piot, Alix	mailto:celineclotuche@gmail.com	féminin
Dedave, Maëlli	mailto:doriandedave@gmail.com	féminin
Dedave, Lia	mailto:doriandedave@gmail.com	féminin
Soenens, Alexine	mailto:laurencedefoy@gmail.com	féminin
Soenens, Edouard	mailto:laurencedefoy@gmail.com	masculin
Soenens, Clémence	mailto:laurencedefoy@gmail.com	féminin
Soenens, Philippine	mailto:laurencedefoy@gmail.com	féminin
Pruvost, Pierre	mailto:f.delaminne@gmail.com	masculin
Pruvost, Thomas	mailto:f.delaminne@gmail.com	masculin
Pruvost, Bastien	mailto:f.delaminne@gmail.com	masculin
Deckers, Aline	mailto:aline.deckers17@gmail.com	féminin
Giacomin, Romain	mailto:babdemain@hotmail.com	masculin
Nicodème, Diego	mailto:priscdenis@yahoo.fr	masculin
Carpentier, Benjamin	mailto:sophiedvlk@hotmail.com	masculin
Carpentier, Romain	mailto:sophiedvlk@hotmail.com	masculin
Carpentier, Dorian	mailto:sophiedvlk@hotmail.com	masculin
Dang Van, Minh Laan	mailto:sophiedvlk@hotmail.com	féminin
Bael, Dido	mailto:mldevosbael@gmail.com	féminin
Bael, Rémi	mailto:mldevosbael@gmail.com	masculin
Dupont, Simon	mailto:stephanie.deliege@uclouvain.be	masculin
Verfaille, Corentin	mailto:af.dewilde@gmail.com	masculin
Verfaille, Baptiste	mailto:af.dewilde@gmail.com	masculin
Verfaille, Cyrielle	mailto:af.dewilde@gmail.com	féminin
Dupont, Alice	mailto:stephanie.deliege@uclouvain.be	féminin
Dupont, Mathieu	mailto:stephanie.duliege@uclouvain.be	masculin
Verdickt, Jérôme	mailto:jverdickt78@gmail.com	masculin
Mottoul, William	mailto:mlgoffioul@gmail.com	masculin
Garcia, Ema	mailto:edurido.seoane@skynet.be	féminin
Leroy, Rosalie	mailto:frederique.fyon@hotmail.com	féminin
Leberger, Camille	mailto:catherine.gardiman@gmail.com	féminin
Genard, Margaux	mailto:famille.genard@skynet.be	féminin
Genard, Camille	mailto:famille.genard@skynet.be	féminin
Genard, Noé	mailto:famille.genard@skynet.be	masculin
Genard, Justin	mailto:famille.genard@skynet.be	masculin
Persiel, Sebastian	mailto:elisabeth.gera@live.fr	masculin
Labbe, Eline	mailto:annesophiegustin@gmail.com	féminin
Labbe, Augustin	mailto:annesophiegustin@gmail.com	masculin
DEWIT, Marie-Paule	mailto:marie-paule.dewit@uclouvain.be	féminin
Dauteuille, Marine	mailto:marine.fievez@gmail.com	féminin
Fievez, Raphaëlle	mailto:marine.fievez@gmail.com	féminin
Krausz, Krisztina	mailto:krauszkrisztina@yahoo.fr	féminin
Verdickt, Victor	mailto:jverdickt78@gmail.com	masculin
Verdickt, Simon	mailto:jverdickt78@gmail.com	masculin
Brohet, Alesia	mailto:vketels@hotmail.com	féminin
le Polain, Emilie	mailto:chdesainthubert@hotmail.com	féminin
le Polain, Constance	mailto:chdesainthubert@hotmail.com	féminin
Nicodème, Juliette	mailto:priscdenis@yahoo.fr	féminin
Lapsin, Léa	mailto:sophieslits@hotmail.com	féminin
Lapsin, Cyril	mailto:sophieslits@hotmail.com	masculin
Gomez, Zoé	mailto:jeks_17@hotmail.com	féminin
Bonnevie, Stéphanie	mailto:bonnevie.stephanie@gmail.com	féminin
Lacroix, Nadine	mailto:nadinelac@gmail.com	féminin
Pirsoul, Julie	mailto:pirsouljulie@hotmail.com	féminin
Bergiers, Adèle		féminin
Dewindt, Catherine	mailto:edwin_et_catherine@hotmail.com	féminin
Ndikumana, Lucien	mailto:ndikuluc@yahoo.fr	masculin
Guillaume, Maud	mailto:florence.hannon@gmail.com	féminin
Guillaume, Anne-Charlotte	mailto:florence.hannon@gmail.com	féminin
Hanrez, Charlie	mailto:hanrez.stephane@gmail.com	masculin
Hanrez, Elisa	mailto:hanrez.stephane@gmail.com	féminin
Yernaux, Matthew	mailto:nancyjacques041982@gmail.com	féminin
Lacourt, Anton	mailto:seblacour@msn.com	masculin
Lemaire, Eloïse	mailto:cecilelebailly@hotmail.com	féminin
Lemaire, Zoé	mailto:cecilelebailly@hotmail.com	féminin
Lemaire, Edouard	mailto:cecilelebailly@hotmail.com	masculin
Brohet, Laia	mailto:vketels@hotmail.com	féminin
Brohet, Nino	mailto:vketels@hotmail.com	masculin
Fiore, Ysaline	mailto:anne.jandrain@hotmail.com	féminin
Fiore, Emelyne	mailto:anne.jandrain@hotmail.com	féminin
Viscardy, Emilie	mailto:misske@rocketmail.com	féminin
Deboutte, Nathalie		féminin
Dzawe, Audric	mailto:audricrayan2018@gmail.com	masculin
Dzawe, Bryonna	mailto:carineenangue@yahoo.fr	féminin
Dzawe, Levy	mailto:carineenangue@yahoo.fr	masculin
Dzawe, Mathys	mailto:carineenangue@yahoo.fr	masculin
Van Weyenbergh, Eglantine	mailto:cedrinedel@hotmail.com	féminin
Mercier, Adam	mailto:krauszkrisztina@yahoo.fr	masculin
Peeters, Brigitte	mailto:brgt.peeters@gmail.com	féminin
Duthoit, Ulysse	mailto:bonneville.stephanie@gmail.com	masculin
Duthoit, Mia	mailto:bonnevie.stephanie@gmail.com	féminin
Duthoit, Théo	mailto:bonnevie.stephanie@gmail.com	masculin
De Brabandere, Frédéric	mailto:fredericdebrabandere@gmail.com	masculin
Thorembais-les-Béguines - Ecole communale - P2	mailto:vdbvalerie@hotmail.com	
Quevrin, Estelle	mailto:quevrinestelle@gmail.com	féminin
Devriendt, Christine	mailto:teatine@live.be	féminin
Pirlot, Donatienne	mailto:donatiennepirlot@hotmail.com	féminin
KOTULA, Téa	mailto:teatine@live.be	féminin
Koeune, Xavier	mailto:nadiadt1213@hotmail.com	masculin
Coquelet, Audrey	mailto:audrey_coquelet@hotmail.com	féminin
Bossassi-Epole, Théophile	mailto:sabine.wernerus@gmail.com	masculin
Hoff, Lisa	mailto:sabine.wernerus@gmail.com	féminin
Bonsacquet, Heidi	mailto:heidibonsacquet@gmail.com	féminin
Keymolen, Christelle	mailto:chriskey77@msn.com	féminin
Paeps, Edeline	mailto:chriskey77@msn.com	féminin
Meesters, Rosa	mailto:heidibonsacquet@gmail.com	féminin
Cravau, Maud	mailto:dvaulet@voo.be	féminin
Eugène, Olivier	mailto:eugenemeuron@gmail.com	masculin
Koeune, Alice	mailto:nadiadt1213@hotmail.com	féminin
Cambron, Germaine		féminin
Bontems, Anaë	mailto:tophebontems@hotmail.com	féminin
Bontems, Luca	mailto:tophebontems@hotmail.com	masculin
Bontems, Bastien	mailto:tophebontems@hotmail.com	masculin
Docq, Ghislaine	mailto:guilaineminsart@gmail.com	féminin
Jaumotte, Julie	mailto:julie.jaumotte@hotmail.com	féminin
Baseil, Adeline	mailto:infivirginienoel@gmail.com	féminin
Baseil, Aurélien	mailto:infivirginienoel@gmail.com	masculin
Goudaer, Pierre	mailto:pierre.goudaer@gmail.com	masculin
Ceysens, Maïté	mailto:mceysens@gmail.com	féminin
Paternotte, Stéphanie	mailto:steph_paternotte@hotmail.com	féminin
Gueur, Sébastien	mailto:colon_caro@yahoo.fr	masculin
Gueur, Eléonore	mailto:colon_caro@yahoo.fr	féminin
Gueur, Raphaël	mailto:colon_caro@yahoo.fr	masculin
Gueur, Faustine	mailto:colon_caro@yahoo.fr	féminin
Nasiadka, Julia	mailto:julia276@wp.pl	féminin
Vaulet, Danielle	mailto:dvaulet@voo.be	féminin
Biston, Tom	mailto:veronique.bertrand@skynet.be	masculin
BRAMS, Catherine	mailto:cath.brams@gmail.com	féminin
REULIAUX, Marie-Louise		féminin
Docquier, Pierre	mailto:pierredocquier@skynet.be	masculin
Docquier, Edouard	mailto:pierredocquier@skynet.be	masculin
Docquier, Philippine	mailto:pierredocquier@skynet.be	féminin
Docquier, Inès	mailto:pierredocquier@skynet.be	féminin
Hautfenne, Emmanuelle	mailto:ehautfenne@gmail.com	féminin
Ceulemans, Isabelle	mailto:isabelle.ceulemans77@gmail.com	féminin
Caufriez, Vincent	mailto:vinch52@hotmail.com	masculin
Caufriez, Nathan		masculin
Perwez - Ecole Jean-Paul II -1e et 2e Maternelles	mailto:beatrice_pirsoul@hotmail.com	
El Kouay, Siham	mailto:elkouaysiham@outlook.fr	féminin
Moukhir, Sherazade	mailto:elkouaysiham@outlook.fr	féminin
Mameli, Chiara	mailto:elkouaysiham@outlook.fr	féminin
Cucuiet, Mihaela Cristina	mailto:cucuietcris@yahoo.com	féminin
PISSOORT, Eliane	mailto:pissoort.swalus@freebel.net	féminin
Gomes Pereira, Andreia	mailto:andreia-2011@hotmail.com	féminin
Scarmure, Anissa	mailto:scarmure.sylvie@gmail.com	féminin
Kravtchouk, Olesia	mailto:olesiakravtchouk@gmail.com	féminin
Mestdag, Michèle	mailto:michelemestdag@gmail.com	féminin
Ernotte, Sylvain	mailto:famille.ernotte@skynet.be	masculin
Ernotte, Laure	mailto:famille.ernotte@skynet.be	féminin
Verheyden, Natacha	mailto:natacha.verheyden@gmail.com	féminin
Uytterhoeven, Geneviève	mailto:genuyt33@gmail.com	féminin
Crespin, Elisabeth	mailto:elisabeth.crespin@gmail.com	féminin
Moeijaers, Isabelle	mailto:moeijaersisabelle@gmail.com	féminin
Slegers, Adrien	mailto:benedicte.debrulle@gmail.com	masculin
Gribaumont, Yves	mailto:yves.gribaumont@skynet.be	masculin
Fyon, Frédérique	mailto:frederique.fyon@hotmail.com	féminin
Perwez - Lire et Ecrire- Oral	mailto:sylvie.brasseur@lire-et-ecrire.be	
Paquay, Axel	mailto:axel.paquay@gmail.com	masculin
Bidoul, Olivia	mailto:oliviabidoul@hotmail.com	féminin
Draye, Marie	mailto:mariedraye01@gmail.com	féminin
Delhaute, Fanny	mailto:mariedraye01@gmail.com	féminin
Delhaute, Martin	mailto:mariedraye01@gmail.com	masculin
Delhaute, Esteban	mailto:mariedraye01@gmail.com	féminin
Gilles, Marie-Laurence	mailto:marielaurence_1360@hotmail.com	féminin
Hagreen, Brenda		féminin
Bocken, Xavier	mailto:xab.ads@gmail.com	masculin
Schepmans, Marie-Ange	mailto:lardinoitmichel@voo.be	féminin
Renard, Anaïs	mailto:anais.ren@gmail.com	féminin
Giacomin, Raphaël	mailto:babdemain@hotmail.com	masculin
de Behault du Carmois, Marc	mailto:marcdbdc@gmail.com	masculin
Tilkin, Gérald	mailto:geraldtilkin@gmail.com	masculin
Peltgen, Marie-Paule	mailto:peltgen.mp@gmail.com	féminin
Vlieghe, Maxime	mailto:maxime.vlieghe@gmail.com	masculin
Nouveau lecteur 4		
Coosemans, Anne	mailto:annecose25@gmail.com	féminin
Haegeman, Stéphane	mailto:stephane.h@live.be	masculin
Rulens, Sylvie	mailto:laurent@wiamenet.be	féminin
Gustin, Anne-Sophie	mailto:annesophiegustin@gmail.com	féminin
Barras, Mathieu	mailto:mathbarras@gmail.com	masculin
Aldric, Loredana	mailto:lore.aldric@live.be	féminin
Taelmeester, Kelly	mailto:kelly-taelmeester@hotmail.com	féminin
MAES, Camille	mailto:camillemaes@hotmail.com	féminin
Miguel, Jean-Sébastien	mailto:jeansebastien.miguel@gmail.com	masculin
Quewet, Marie-Charlotte	mailto:quewet_charlotte@hotmail.com	féminin
Piraux, Françoise	mailto:fr.piraux@gmail.com	féminin
Koekelberg, Fernand	mailto:fernand.koekelberg@skynet.be	masculin
Lebbe, Virginie	mailto:virginie.lebbe@gmail.com	féminin
Piot, Frédéric	mailto:piotfred@gmail.com	masculin
Piot, Zélie	mailto:celineclotuche@gmail.com	féminin
Ziolkowski, Isabelle	mailto:12iolkowski@yahoo.com	féminin
Decamp, Amandine	mailto:amandine_decamp@hotmail.com	féminin
Genard, Antoine	mailto:dujardincl@gmail.com	masculin
Janssens, Gwendoline	mailto:herveheymans@hotmail.com	féminin
Storckel, Isabelle	mailto:isabelle_storckel@yahoo.fr	féminin
Heijmans, Hervé Alfred	mailto:herveheymans@hotmail.com	masculin
Lavalou, Julie	mailto:julie.lavalou@gmail.com	féminin
Kouakou, Georges-William	mailto:kouakougorge725@gmail.com	masculin
Van Hentenryk, Patrick	mailto:p.vanhentenryk@gmail.com	masculin
Gauthier, Diane	mailto:xavdiane@voo.be	féminin
Perwez - Ecole Jean-Paul II-Accueil	mailto:direction@jp2.be	féminin
Laby, Laetitia	mailto:laetitialaby@gmail.com	féminin
Miranda Miranda, Lisa	mailto:mirandamirandalisa@yahoo.fr	féminin
Van Mol, Marc		masculin
Ay, Halice		féminin
Dupont, Joachim René	mailto:dupont.laurence@skynet.be	masculin
Dekeuster, Thierry	mailto:severineb79@hotmail.com	masculin
Fierens Gevaert, Claire Catherine	mailto:claire.fierens@gmail.com	féminin
de l'Escaille, Nathalie	mailto:nathdelescaille@gmail.com	féminin
JADOT, Odile	mailto:julie.angelroth@gmail.com	féminin
Nembetwa, Divine	mailto:divinebopembe@hotmail.com	féminin
Dutrieux, Delphine	mailto:dutrieuxdelphine@msn.com	féminin
DUMORTIER, Marjorie	mailto:marjorie_dumortier@hotmail.fr	féminin
Van Ruymbeke, Marie-Dominique	mailto:mdtaymans@hotmail.com	féminin
Bossut, Nicolas	mailto:nbossut@gmail.com	masculin
Poswick, Sophie	mailto:sovancut@hotmail.com	féminin
Vandenberg, Mercedes	mailto:merc.luna@hotmail.be	féminin
Demain, Barbara	mailto:babdemain@hotmail.com	féminin
Decelle, Lisa	mailto:lisadecelle@hotmail.fr	féminin
Capron, Michèle	mailto:michelecapron@hotmail.com	féminin
Vanschoonwinkel, Christian	mailto:christianvan1729@hotmail.com	masculin
Speltincx, Véronique	mailto:v.speltincx@yahoo.fr	féminin
Virlee, Justin	mailto:stephanieboignet@gmail.com	masculin
Straus, Sébastien	mailto:genestailers@hotmail.com	masculin
Bonnegarde, Astrid	mailto:astrid.bonnegarde@gmail.com	féminin
Perwez - Bibliothèque (animations)	mailto:bibliotheque@perwez.be	
Malèves-Sainte-Marie - Ma Petite Ecole	mailto:mapetiteecoledemaleves@gmail.com	
Pauwels, Marie	mailto:pauwelsmary@hotmail.com	féminin
Maessen, Aude	mailto:aude.maessen@gmail.com	féminin
Le Polain, Marie	mailto:marielepolain@gmail.com	féminin
Siperius, Cédric	mailto:delphineetcedric@hotmail.fr	masculin
Antoniou, Flori	mailto:floriaiglenoir@hotmail.com	féminin
Thorembais-Saint-Trond - Ecole communale - 1e maternelle	mailto:ec.farandole@gmail.com	
Dedave, Dorian	mailto:doriandedave@gmail.com	masculin
Pichaud, Marion	mailto:marionpichaud7@gmail.com	féminin
Perwez - Ecole Jean-Paul II-5 primaire B	mailto:direction@jp2.be	féminin
Decleer, Géraldine	mailto:geraldine.tkint@gmail.com	féminin
Taverniers, Cédric	mailto:cedric.taverniers@hotmail.com	masculin
Devos, Virginie	mailto:virginiedevos00@gmail.com	féminin
Eugène, Julie	mailto:julie.eugene@yahoo.fr	féminin
Vase, Stéphanie	mailto:stefvase@hotmail.fr	féminin
LEBACQ, Marie	mailto:marielebacq1606@gmail.com	féminin
Petit, Hélène	mailto:petithelene@hotmail.be	féminin
Sunnaert, Delphine	mailto:sunnaert.d@hotmail.com	féminin
Graas, Vanessa	mailto:tv.clemeur@gmail.com	féminin
Bosman, Héloïse	mailto:bosmanh79@gmail.com	féminin
Genicot, Catherine	mailto:catherinegenicot@hotmail.com	féminin
Perwez - Ecole communale - 2e-3e mat	mailto:stefvase@hotmail.fr	féminin
Zocko, Michèle Solange	mailto:michele.zocko@yahoo.fr	féminin
Van Uytven, Sophie	mailto:Sophievu2@hotmail.com	féminin
Corriat, Violette	mailto:covio@hotmail.be	féminin
Mandelaire, Laurence	mailto:nicolas168pierard@hotmail.com	féminin
Vanhamme, Cécile	mailto:vanhammececile@gmail.com	féminin
Slimani, Mourad	mailto:coune.severine@gmail.com	masculin
Charles, Anne-Noëlle	mailto:an.charles@gmail.com	féminin
Roelandt, Caroline Léa	mailto:caroline.roelandt@me.com	féminin
Cambron, Valérie	mailto:val1109@hotmail.com	féminin
Poelmans, Audrey	mailto:audrey@deycoiff.be	féminin
Sulaj, Qesfer	mailto:qsulaj@gmail.com	féminin
Snyders, Vangelis	mailto:vangelis101010@msn.com	masculin
De Bock (Semeurs d'histoires), Aline	mailto:aline.debock@gmail.com	féminin
Gilles, Marie-Noëlle	mailto:marienoelle18@hotmail.com	féminin
Hanze, Christelle	mailto:hanzekrystel@hotmail.com	féminin
De Paoli, Sylvie Liliane	mailto:sylvie.dp@hotmail.com	féminin
Bouillard, Cindy	mailto:cinbouillard@hotmail.com	féminin
Bertrand, Dorothée	mailto:doche@live.be	féminin
Ghiotto, Catherine	mailto:catherine.ghiotto@gmail.com	féminin
Maurer, Noémie	mailto:noemie.maurer@gmail.com	féminin
Choffray, Aurora	mailto:aurore.choffray@gmail.com	féminin
JEHAES, Geneviève	mailto:gene.jehaes@hotmail.com	féminin
Jacques, Nancy	mailto:nancyjacques041982@gmail.com	féminin
Henry, Isabelle		féminin
Laloy, David	mailto:davidlaloy@hotmail.com	masculin
Goditiabois, Veerle	mailto:veerle.goditiabois@b-rail.be	féminin
Meeus, Sibylle	mailto:sibylle.meeus@hotmail.com	féminin
Mouthuy, Marie-Thérése		féminin
Ribeiro, Paula	mailto:paularibeirobe@yahoo.fr	féminin
LAMBERT, Valérie	mailto:lambert_val@hotmail.com	féminin
Bavoillot, Marie-France	mailto:mfbavoillot22@gmail.com	féminin
Balzat, Roland	mailto:rolandbalzat@hotmail.com	masculin
Verleure, Aurélie	mailto:aurelieverleure@hotmail.com	féminin
Bourlet, Catherine	mailto:catherinebourlet@hotmail.com	féminin
Benallouch, Choukri	mailto:choukri.benallouch@gmail.com	masculin
Butzbach, Natacha	mailto:ntch.butzbach@ymail.com	féminin
Petit, Catherine	mailto:catherine.petit@gmail.com	féminin
O'Neill, Emily	mailto:emily.oneill2000@gmail.com	féminin
Albanese, Véronique	mailto:veroalba1331@gmail.com	féminin
Latour, Lisa	mailto:lisa.latour@hotmail.com	féminin
Mertens, Nathalie	mailto:nathalie_mertens@voo.be	féminin
Maes, Gisèle	mailto:maesgisele@gmail.com	féminin
Croon, Julie	mailto:julie.croon@gmail.com	féminin
WILLIQUET, Catherine	mailto:williquetc@hotmail.com	féminin
Bayet, Axelle	mailto:axelle.bayet@hotmail.com	féminin
Caignie, Mireille	mailto:micheletmireille@hotmail.be	féminin
Godin, Diane	mailto:dianegod@hotmail.com	féminin
Rigo, Adrienne	mailto:adrienne.rigo@gmail.com	féminin
Loppe, Manon	mailto:liherreman@gmail.com	féminin
Maldague, Marie-Claude	mailto:maldague-mc@hotmail.com	féminin
Guillaume, Géraldine	mailto:geraldineguillaume@gmail.com	féminin
Demolder, Françoise	mailto:francoise.demolder@hotmail.com	féminin
MAGINET, Déborah	mailto:deborahmaginet97@gmail.com	féminin
Gera, Elisabeth	mailto:elisabeth.gera@live.fr	féminin
Dewasme, Céline	mailto:dewasmeceline@gmail.com	féminin
Rosta, Marie	mailto:rostamarie@gmail.com	féminin
DEWIT, Séverine-N	mailto:dewitse21@hotmail.com	féminin
Parent, Frédérique	mailto:fredisaert@gmail.com	féminin
Defrenne, Géraldine	mailto:defrennege@gmail.com	féminin
Timmermans, Bénédicte	mailto:niquelasbl@yahoo.be	féminin
Mignon, Isabelle	mailto:isamignon@hotmail.com	féminin
IFO-MALAAT, Jeca Uy	mailto:jeks_17@hotmail.com	féminin
Geuens, Janine	mailto:geuensjanine@hotmail.com	féminin
Kernkamp, François-Xavier	mailto:brigitte_fernandez@msn.com	masculin
Michiels, Véronique	mailto:verodemaegd@hotmail.com	féminin
Springuel, Donatienne	mailto:donatienne_springuel@hotmail.com	féminin
Fontinois, Ulrich	mailto:ulfonti@gmail.com	masculin
DUPUIS, Laurence	mailto:dupuis1608@gmail.com	féminin
Vromman, Delphine Christine	mailto:vromman1325@hotmail.com	féminin
Snappe, Jérôme	mailto:snappej@hotmail.com	masculin
Verwimp, Cindy	mailto:solyluz66@hotmail.fr	féminin
Guyot, Christine	mailto:c_guyot_declerck@hotmail.com	féminin
Pierard, Christelle	mailto:pierardchristelle@yahoo.fr	féminin
Maes, Véronique	mailto:vero.maes@gmail.com	féminin
Scarmure, Sylvie	mailto:scarmure.sylvie@gmail.com	féminin
Taymans, Gaëlle	mailto:gataymans@hotmail.com	féminin
Hermant, Johan	mailto:giachdesign@gmail.com	masculin
Flagothier, Mélanie	mailto:melanie.flagothier@jti.com	féminin
Magerus, Valérie	mailto:vmagerus@yahoo.com	féminin
Clotuche, Estelle	mailto:estelleclotuche@gmail.com	féminin
Swennen, Sandrine	mailto:sandrine.swennen@gmail.com	féminin
Galvan, Florence	mailto:florencegalvan@hotmail.fr	féminin
Loix, Caroline	mailto:carolineloix@hotmail.com	féminin
Meuret, Stéphanie	mailto:oliviermeuret@hotmail.com	féminin
Perwez - Ecole Jean-Paul II - 1e Primaire B	mailto:audry.monin1@gmail.com	inconnu
Verhoeven, Claudine	mailto:verclaudine@gmail.com	féminin
Gilles, Valérie	mailto:laliegilles@live.be	féminin
Perwez - Ecole Jean-Paul II -2e Primaire B	mailto:dupuis1608@gmail.com	
Perwez - Ecole Jean-Paul II -2e Primaire A	mailto:dupuis1608@gmail.com	
Perwez - Ecole Jean-Paul II -1e Primaire A	mailto:audry.monin1@gmail.com	
Gerrebos, Manou	mailto:manougerr@yahoo.fr	féminin
Perwez - Bibliothèque (prêt occasionnel)		
Paye, Delphine	mailto:dany.minet@gmail.com	féminin
Herreman, Doris	mailto:dorishugo@skynet.be	féminin
Bratescu, Alexandra	mailto:bratesa@yahoo.com	féminin
Stuckens, Isabelle	mailto:istuckens@hotmail.com	féminin
Toussaint, Anne-Marie	mailto:am.toussaint@skynet.be	féminin
Hubert, Caroline	mailto:hubert_caroline@hotmail.com	féminin
Rowet, Jodie	mailto:jodie_rowet@hotmail.com	féminin
Pappi, Nathalie	mailto:nathalie.pappi@gmail.com	féminin
Eggerickx, Jessica Nathalie	mailto:jess.eggerickx@gmail.com	féminin
Denis, Priscilla Maureen	mailto:priscdenis@yahoo.fr	féminin
Grégoire, Quentin	mailto:quentin.gregoire@gmail.com	masculin
de Foy, Laurence	mailto:laurencedefoy@gmail.com	féminin
Bertrand, Céline	mailto:celine_bertrand@hotmail.com	féminin
Materne, Céline		féminin
Kasongo Mbaya, Samuel	mailto:samuelkasongo@hotmail.com	masculin
Gevers, Lisette	mailto:bosmans.j@skynet.be	féminin
Liégeois, Paul	mailto:paulliegeois@outlook.com	masculin
KEYEN, Louane	mailto:val-gilson@hotmail.com	féminin
Lacourt, Sébastien	mailto:seblacour@msn.com	masculin
MAJOIE, Marie-Hélène	mailto:majoiemarie@hotmail.com	féminin
Malaise, Pauline	mailto:pauline_malaise@hotmail.com	féminin
Polet, Anne-Marie	mailto:maniepolet@hotmail.com	féminin
Buxant, Claire	mailto:clairebuxant@gmail.com	féminin
Saye, Amélie	mailto:amelie.saye@live.fr	féminin
Surkol, Laurence	mailto:laurence.surkol@yahoo.fr	féminin
de Terwangne, Thibault	mailto:detthib@skynet.be	masculin
Tollet, Stéphanie	mailto:stephanie.tollet13@gmail.com	féminin
Lemaire, Hildegarde	mailto:lemaireh@hotmail.com	féminin
Pilette, Vanessa	mailto:vanessa.pilette@gmail.com	féminin
Carton, Nicole	mailto:ni.carton@skynet.be	féminin
Perwez - Ecole Jean Paul II-5e Primaire	mailto:benezw@hotmail.com	
Vandenschrick, Pascal	mailto:vdspa@skynet.be	masculin
DUJARDIN, Alice	mailto:dujardinalice@gmail.com	féminin
Blasioli, Virginie	mailto:vblasiol@hotmail.com	féminin
Perwez - Ecole Jean-Paul II -1e et 2e Maternelles	mailto:cathybarras.cb@gmail.com	
Holvoet, Hubert	mailto:hubertholvoet@hotmail.com	masculin
Liénart, Alice	mailto:alicelienart@hotmail.com	féminin
FIEVEZ, Isabelle	mailto:isa_fievez@hotmail.com	féminin
Ernes, Katia	mailto:eduardo.seoane@skynet.be	féminin
Botquin, Martine	mailto:mbotquin@gmail.com	féminin
Garot, Madline		féminin
Stenuit, Géraldine	mailto:stenuitg@gmail.com	féminin
Malèves-Sainte-Marie - Ecole communale - 1e primaire	mailto:mariesimon09@hotmail.com	
Dupuis, Véronique		féminin
Destrebecq, Sylvie	mailto:syl.destrebecq@gmail.com	féminin
Boucly, Yves	mailto:yves.boucly.yb@gmail.com	masculin
Hauspy, Sarah	mailto:sarah_hauspy@hotmail.com	féminin
Vincent, Nadine	mailto:vincent.nadine@yahoo.fr	féminin
Parmentier, Luna	mailto:isabelleinfirmiere@hotmail.com	féminin
Vercoutere, Ferdinand	mailto:clotildeviaene@yahoo.com	masculin
Davister, Alexandre	mailto:valfrancis83@icloud.com	masculin
Davister, Augustin	mailto:valfrancis83@icloud.com	masculin
Vanderhaegen, Céline	mailto:c_vdhaegen@hotmail.com	féminin
Despontin, Maxime	mailto:c_vdhaegen@hotmail.com	masculin
Despontin, Simon	mailto:c_vdhaegen@hotmail.com	masculin
Boswell, Oliver	mailto:baonville.caroline@gmail.com	masculin
Boswell, Ayleen	mailto:baonville.caroline@gmail.com	féminin
Rogier, Gaëlle	mailto:garogier27@hotmail.com	féminin
Russo, Mia	mailto:garogier27@hotmail.com	féminin
Olemans, Dominique	mailto:olemansd@gmail.com	masculin
Olemans, Guillaume	mailto:olemansd@gmail.com	masculin
Balza, Alice	mailto:superlolinette@yahoo.fr	féminin
Balza, Juliette	mailto:superlolinette@yahoo.fr	féminin
Gera, Pauline	mailto:mgerbol@hotmail.com	féminin
Dropsy, Théo	mailto:mgerbol@hotmail.com	masculin
de Hemptinne, Yann	mailto:gataymans@hotmail.com	masculin
de Hemptinne, Flore	mailto:gataymans@hotmail.com	féminin
Vermeiren, Opaline	mailto:vermeiren@hotmail.com	féminin
Echterbille, Tom	mailto:mikachu1@hotmail.com	masculin
Echterbille, Léa	mailto:mikachu1@hotmail.com	féminin
Suniaga, Dayana	mailto:dayana.suniaga@yahoo.com	féminin
Paquet, Célia	mailto:olivierpaquet78@gmail.com	féminin
Bury, Veerle	mailto:veto.geron@gmail.com	féminin
Geron, Elise	mailto:veto.geron@gmail.com	féminin
Geron, Remy	mailto:veto.geron@gmail.com	masculin
Richard, Gregory	mailto:sandrine_timsonet@hotmail.com	masculin
Richard, Benjamin	mailto:sandrine_timsonet@hotmail.com	masculin
Kaisin, Sandra	mailto:sanny.78@hotmail.com	féminin
Cocozza, Matteo	mailto:sanny.78@hotmail.com	masculin
Hougardy, Pascale	mailto:pascale.hougardy@gmail.com	féminin
Braem, Lisa	mailto:pascale.hougardy@gmail.com	féminin
Dekeuster, Alexis	mailto:severineb79@hotmail.com	masculin
Dekeuster, Lucas	mailto:severineb79@hotmail.com	masculin
Lecocq, Suzelle	mailto:suzelle.lecocq@gmail.com	féminin
Vermeiren, Isaure	mailto:vermeiren@hotmail.com	féminin
Vermeiren, Ulysse	mailto:vermeiren@hotmail.com	masculin
Vermeiren, Auguste	mailto:vermeiren@hotmail.com	masculin
Henquet, Nicholas-Andres	mailto:dayana.suniaga@yahoo.com	masculin
Henquet, Elèa	mailto:dayana.suniaga@yahoo.com	féminin
Henquet, Inès	mailto:dayana.suniaga@yahoo.com	féminin
Geoffroy, Dorine	mailto:geoffroy.th@gmail.com	féminin
JACQMAIN, Elouann	mailto:vmagerus@yahoo.com	masculin
Dang Van, Dorian	mailto:sophiedvlk@hotmail.com	masculin
Dang Van, Minh-Loan	mailto:sophiedvlk@hotmail.com	féminin
Sikkink, Maroussia	mailto:aurelie.regout@gmail.com	féminin
Sikkink, Augustin	mailto:aurelie.regout@gmail.com	masculin
Sikkink, Adrien	mailto:aurelie.regout@gmail.com	masculin
Sadin, Nathalie	mailto:sadin.nathalie@gmail.com	féminin
Delobbe, Michel	mailto:micheletmireille@hotmail.be	masculin
Parmentier, Natan	mailto:isabelleinfirmiere@hotmail.com	masculin
Didier, Nadine (Semeurs d'Histoires)	mailto:nadine.didier@uclouvain.be	féminin
Armand, Delphine	mailto:del_armand@yahoo.com	féminin
Denis, Arthur	mailto:billiet_veronique@hotmail.com	inconnu
Denis, Alix	mailto:billiet_veronique@hotmail.com	féminin
Delepine, Leo	mailto:del-armand@yahoo.com	masculin
Delepine, Lucie	mailto:del-armand@yahoo.com	féminin
Delepine, Eliott	mailto:del-armand@yahoo.com	masculin
Delepine, Laurent	mailto:laurent.delepine@hotmail.com	masculin
Perwez - Ecole communale - 3e maternelle	mailto:rheinhardsara@hotmail.com	
Walrand, Alice	mailto:peetersvero@hotmail.com	féminin
Bethke, Mindy	mailto:mindybethke@hotmail.be	féminin
Mayne, Dany	mailto:mindybethk@hotmail.be	masculin
Pouleur, Florence	mailto:dbruyndo@hotmail.com	féminin
Liénart, Alexandre	mailto:cinbouillard@hotmail.com	masculin
Liénart, Auriane	mailto:cinbouillard@hotmail.com	féminin
Liénart, Amaury	mailto:cinbouillard@hotmail.com	masculin
Hoornaert, Timon	mailto:kristel.close75@gmail.com	masculin
Hoornaert, Zélie	mailto:kristel.close75@gmail.com	féminin
Sonna, Cassandra	mailto:moeijaersisabelle@gmail.com	féminin
Defrenne, Paul	mailto:pdefrenne@voo.be	masculin
Germeau, Caroline	mailto:caro.germeau@hotmail.com	féminin
Berchem, Alexis	mailto:caro.germeau@hotmail.com	masculin
Mayne, Léna	mailto:mindybetke@hptmail.be	féminin
Biot, Camille	mailto:camille.biot@hotmail.com	féminin
César, Clémence	mailto:vromman1325@hotmail.com	féminin
Questiaux, Iliona	mailto:mariska.mestdagh@skynet.be	féminin
Questiaux, Andreas	mailto:mariska.mestdagh@skynet.be	masculin
Duchêne, Hugo		masculin
Duchêne, Corenthin		masculin
Hance, Constantin		masculin
Hance, Tom		masculin
Brunebarbe, Andrew	mailto:hugobrookevinipeyton@outlook.fr	masculin
Brunebarbe, Brooke	mailto:hugobrookevinipeyton@outlook.fr	féminin
Brunebarbe, Vincenzo	mailto:hugobrookevinipeyton@outlook.fr	masculin
Brunebarbe, Hugo	mailto:hugobrookevinipeyton@outlook.fr	masculin
Allard, Peyton	mailto:hugobrookevinipeyton@outlook.fr	féminin
Decraie, Juliette	mailto:fracalin@outlook.be	féminin
Decraie, Delphine	mailto:fracalin@outlook.be	féminin
Harvengt, Gabriel	mailto:bratesa@yahoo.com	masculin
Harvengt, Marilou	mailto:bratesa@yahoo.com	féminin
Beldars, Laurent	mailto:laube999@gmail.com	masculin
Ledent, Ambroise	mailto:defrenneg@gmail.com	masculin
Berchem, Augustin	mailto:caro.germeau@hotmail.com	masculin
Vangorp, Tom	mailto:caro.germeau@hotmail.com	masculin
Ansay, Pascale	mailto:pascale.ansay@gmail.com	féminin
Pironet, Léa	mailto:pelican.1973@hotmail.com	féminin
Dehogne, Nathan	mailto:paularibeirobe@yahoo.fr	masculin
Pirmez, Valentine	mailto:sadin.nathalie@gmail.com	féminin
Ledent, Anatole	mailto:defrenneg@gmail.com	masculin
Bozzo, Alice	mailto:nath.galle@gmail.com	féminin
BELDARS, Léna	mailto:lenachamaloow@gmail.com	féminin
Beldars, Tom	mailto:laube999@gmail.com	masculin
Lahlou, Syrine	mailto:laube999@gmail.com	féminin
Lahlou, Amir	mailto:laube999@gmail.com	masculin
Bedoret, Marie	mailto:mariebedo@gmail.com	féminin
Gérard, Brieuc	mailto:geraldineguillaume@gmail.com	masculin
Langelez, Manon	mailto:axelle.bayet@hotmail.com	féminin
Langelez, Clara	mailto:axelle.bayet@hotmail.com	féminin
Thibaut, Véronique	mailto:vero.thibaut@gmail.com	féminin
Lambert, Lucie	mailto:vanhammececile@gmail.com	féminin
Lambert, Noah	mailto:vanhammececile@gmail.com	masculin
Ecrin - Centre Culturel - Eghezée	mailto:info@ecrin.be	
Mayné, Nicolas	mailto:nathalie_mertens@voo.be	masculin
Rasquin, Mélanie	mailto:melrasquin@gmail.com	féminin
Dardenne, Caroline	mailto:caroline.dardenne@centrepms.be	féminin
Gobert, Robin	mailto:caroline.dardenne@centrepms.be	masculin
Marchal, Eline	mailto:marchalperwez@gmail.com	féminin
Pedrozola, Chimen	mailto:chimep@gmail.com	féminin
Lenoble, Magali	mailto:magalilenoble@hotmail.com	féminin
Delvaux, Louise	mailto:vero.thibaut@gmail.com	féminin
Delvaux, Baptiste	mailto:vero.thibaut@gmail.com	masculin
Hyndrikx, Mathias	mailto:veronique.weron@live.com	masculin
Hyndrikx, Louis	mailto:veronique.weron@live.com	masculin
Hyndrikx, Robin	mailto:veronique.weron@live.com	masculin
Hyndrikx, Nathan	mailto:veronique.weron@live.com	masculin
Kovarski, Michèle	mailto:indimimi@hotmail.com	féminin
Delmarcelle, Enzo	mailto:jerome.delmarcelle@hotmail.fr	masculin
Delmarcelle, Jérôme	mailto:jerome.delmarcelle@hotmail.fr	masculin
Osez'Art	mailto:patricia.davies@atelierscreatifsperwez.be	
François, Cécile	mailto:cecile.angelique@hotmail.com	féminin
Collet, Camille	mailto:melrasquin@gmail.com	féminin
Gobert, Lola	mailto:caroline.dardenne@centrepms.be	féminin
Gobert, Nina	mailto:caroline.dardenne@centrepms.be	féminin
Versmissen, Christelle	mailto:christelle.versmissen@yahoo.com	féminin
Versmissen, Mathias	mailto:christelle.versmissen@yahoo.com	masculin
Lauvaux, Florence	mailto:neinnor@hotmail.com	féminin
Lauvaux, Valentin	mailto:neinnor@hotmail.com	masculin
Genette, Alexandra	mailto:a.vanhaecht@gmail.com	féminin
Fontaine, Gautier	mailto:pauwelsmary@hotmail.com	masculin
Fontaine, Romane	mailto:pauwelsmary@hotmail.com	féminin
Richir, Tristan	mailto:isabellecandael@hotmail.com	masculin
Alaoui, Kenza	mailto:pamela.heuts@gmail.com	féminin
Kane, Lucie	mailto:Sophievu2@hotmail.com	féminin
Kane, Chloé	mailto:Sophievu2@hotmail.com	féminin
Sevrin, Guy		masculin
Coppens, Hélène	mailto:helenecoppens95@gmail.com	féminin
Behets Wydemans, Victoria	mailto:kejzmans@gmail.com	féminin
Galle, Nathalie	mailto:nath.galle@gmail.com	féminin
Andries, Elinor	mailto:priscilla.dehennin@skynet.be	féminin
Andries, Sixtine	mailto:priscilla.dehennin@skynet.be	féminin
Hanin, Olivier	mailto:gene.jehaes@hotmail.com	masculin
Hanin, Aloïs	mailto:gene.jehaes@hotmail.com	masculin
Hanin, Manon	mailto:gene.jehaes@hotmail.com	féminin
Micheau, Marius	mailto:cindy.galle@yahoo.fr	masculin
Vermeire, Elyne	mailto:amandine_decamp@hotmail.com	féminin
Phukan, Igor	mailto:grenadinegm27@hotmail.com	masculin
Phukan, Zoya	mailto:grenadinegm27@hotmail.com	féminin
Vandenschrick, Raphaël	mailto:apirard01@gmail.com	masculin
Vandenschrick, Mariane	mailto:apirard01@gmail.com	féminin
Annet, Manon	mailto:apirard01@gmail.com	féminin
Genon, Fanny	mailto:julie.pensis@gmail.com	féminin
Genon, Charline	mailto:julie.pensis@gmail.com	féminin
Swoboda, Elliot	mailto:helenecoppens95@gmail.com	masculin
Swoboda, Emma	mailto:helenecoppens95@gmail.com	féminin
Mukawera, Providence	mailto:umprov03@yahoo.fr	féminin
JACQMAIN, Maëlys	mailto:vmagerus@yahoo.com	féminin
Bruyndonckx, Maxime	mailto:dbruyndo@hotmail.com	masculin
Meyts, Isabelle	mailto:imeyts@hotmaill.com	féminin
Buscema, Thomas		masculin
Sterpigny, Lucie	mailto:imeyts@hotmail.com	féminin
Ludewig, Jessica	mailto:jessica.ludewig@hotmail.com	féminin
Ampamba, Tracy	mailto:jessica.ludewig@hotmail.com	féminin
Albert, Marie-Paule		féminin
Pirotte, Angélique	mailto:angeliquepirotte28@gmail.com	féminin
Molhant, Emilie	mailto:angeliquepirotte28@gmail.com	féminin
Molhant, Annliese	mailto:angeliquepirotte28@gmail.com	féminin
BARBAIX, Alice	mailto:anne.daloze@cfwb.be	féminin
Corbisier, Virginie	mailto:virginiecorbisier@hotmail.com	féminin
Van Haecht, Adeline	mailto:a.vanhaecht@gmail.com	féminin
Guillaume, Sasha	mailto:virginiecorbisier@hotmail.com	masculin
Guillaume, Elsa	mailto:virginiecorbisier@hotmail.com	féminin
Warnand, Joanne	mailto:joannenaya@hotmail.com	féminin
Dirckx, Catherine	mailto:catherine.dirckx@gmail.com	féminin
Vandermaesen, Margaux	mailto:catherine.dirckx@gmail.com	féminin
Vandermaesen, Lison	mailto:catherine.dirckx@gmail.com	féminin
Vandermaesen, Tim	mailto:catherine.dirckx@gmail.com	masculin
Henrotte, Manon	mailto:manonhenrotte@outlook.com	féminin
de Brabander, Els	mailto:elseke.007@hotmail.com	féminin
Despat, Thomas	mailto:elstill@gmail.com	masculin
Despat, Elise	mailto:elstill@gmail.com	féminin
Michiels, Sacha	mailto:verodemaegd@hotmail.com	masculin
Michiels, Marion	mailto:verodemaegd@hotmail.com	féminin
Segers, Magali	mailto:magali.segers@hotmail.com	féminin
Hottart, Sophie	mailto:pandoravampo1@hotmail.com	féminin
Damoiseau, Manon	mailto:pandoravamp01@hotmail.com	féminin
Roger, Annick	mailto:annickroger090@yahoo.fr	féminin
Longonya, Dodie		masculin
Houche, Lena	mailto:elseke.007@hotmail.com	féminin
Houche, Léane	mailto:elseke.007@hotmail.com	féminin
Gustin, Mathieu	mailto:mathieu.gustin@gmail.com	masculin
Gustin, Valentin	mailto:mathieu.gustin@gmail.com	masculin
Gustin, Nyssa	mailto:mathieu.gustin@gmail.com	féminin
Hoff, François	mailto:francoishoff@hotmail.com	masculin
Hanesse, Muriel	mailto:murielfantigrossi@hotmail.com	féminin
Fantigrossi, Noah	mailto:murielfantigrossi@hotmail.com	masculin
Fantigrossi, Flavie	mailto:murielfantigrossi@hotmail.com	féminin
Liénard, Iris	mailto:evelyne.pardonge@hotmail.com	féminin
Ausloos, Jacqueline	mailto:jacq.pompapaye@gmail.com	féminin
Liénard, Anouck	mailto:evelyne.pardonge@hotmail.com	féminin
Still, Elspeth	mailto:elstill@gmail.com	féminin
Vermeire, Eden	mailto:amandine_decamp@hotmail.com	masculin
Wodon, Maëlle	mailto:beatrice.ransquin@skynet.be	féminin
Campion, Antoine	mailto:sophdomken5@hotmail.com	masculin
Campion, Charles	mailto:sophdomken5@hotmail.com	masculin
Nardella, Sophie	mailto:sophie_nardella@hotmail.com	féminin
Lenne, Maddly	mailto:julie.lavalou@gmail.com	féminin
Lenne, Brieuc	mailto:julie.lavalou@gmail.com	masculin
Lenne, Victor	mailto:julie.lavalou@gmail.com	masculin
Generet, Mathieu	mailto:anne.martegani@gmail.com	masculin
Ruidant, Céleste	mailto:annesophie5@hotmail.com	féminin
Ruidant, Romane	mailto:annesophie5@hotmail.com	féminin
Ruidant, Pierre	mailto:annesophie5@hotmail.com	masculin
Van Ingelgem, Amélie	mailto:murieldeudon@gmail.com	féminin
Van Ingelgem, Augustin	mailto:murieldeudon@gmail.com	masculin
Dirick, Susy	mailto:susy@dirick.fr	féminin
Grandclaudon, Jeremy	mailto:jeremy.grandclaudon@gmail.com	masculin
Piscina, Margot	mailto:margot.piscina@gmail.com	féminin
Vandersteen, Céline	mailto:celinevandersteen@hotmail.com	féminin
Moureau, Sébastien	mailto:charlotteetsebastien@gmail.com	masculin
Handichi, Khadija	mailto:khadija1360@live.fr	féminin
Barbach, Amin	mailto:khadija1360@live.fr	masculin
Barbach, Jasmin	mailto:khadija1360@live.fr	féminin
Spindel, Maude	mailto:maudespindel@gmail.com	féminin
Moureau, Sibylle	mailto:charlotteetsebastien@gmail.com	féminin
Loudière, Manon	mailto:maudespindel@gmail.com	féminin
Loudière, Enda	mailto:maudespindel@gmail.com	féminin
Schair, Michaël	mailto:mikeshair@gmail.com	masculin
Arickx, Julie	mailto:juju0888@hotmail.com	féminin
Elens, Camille	mailto:juju0888@hotmail.com	féminin
Walling, Lise	mailto:lise.walling@hotmail.be	féminin
Dropsy, William	mailto:lise.walling@hotmail.be	masculin
Elens, Léa	mailto:juju0888@hotmail.com	féminin
Schair, Samuel	mailto:mikeshair@gmail.com	masculin
Lambricht, Louis	mailto:aurelieverleure@hotmail.com	masculin
Lambricht, Valentine	mailto:aurelieverleure@hotmail.com	féminin
Lambricht, Juliette	mailto:aurelieverleure@hotmail.com	féminin
Dagu Nebelly, Jeanne		féminin
Close, Kristel	mailto:kristel.close75@gmail.com	féminin
Demets, Nathalie	mailto:lafrairierestochef@gmail.com	féminin
Mullie, Aurélien	mailto:lgeerinckx@yahoo.fr	masculin
Mullie, Théodore	mailto:lgeerinckx@yahoo.fr	masculin
Martin, Saskia	mailto:lafrairierestochef@gmail.com	féminin
Simons, Gabrielle	mailto:mariebedo@gmail.com	féminin
SOUMILLION, Lili	mailto:qogacio@gmail.com	féminin
SOUMILLION, Nina	mailto:qogacio@gmail.com	féminin
Ghigny, Anne-Cécile	mailto:marchalperwez@gmail.com	féminin
Marchal, Marie	mailto:marchalperwez@gmail.com	féminin
Pedrozola, Masumbukyle	mailto:chimep@gmail.com	masculin
Peeters, Marine	mailto:isabelle_storckel@yahoo.fr	féminin
Peeters, Julien	mailto:isabelle_storckel@yahoo.fr	masculin
Vander Motten, Mathyas	mailto:mathyasvandermotten@gmail.com	masculin
Hance, Katty	mailto:lievenspatrick81@gmail.com	féminin
Lievens, Lina	mailto:lievenspatrick81@gmail.com	féminin
Lievens, James	mailto:lievenspatrick81@gmail.com	masculin
Lievens, Olivier	mailto:lievenspatrick81@gmail.com	masculin
Hubert, Nell	mailto:gilletsophie@yahoo.fr	inconnu
Verlinden, Jean-Pierre	mailto:jp.verlinden@skynet.be	masculin
Verbrigghe, Patrick	mailto:verbrigghemadeleine@gmail.com	masculin
Samain, Geneviève Madeleine	mailto:samaingenevieve@gmail.com	féminin
Frérotte, Julien	mailto:mfstordeur@hotmail.com	masculin
Frérotte, Lucie	mailto:mfstordeur@hotmail.com	féminin
Frérotte, Alice	mailto:mfstordeur@hotmail.com	féminin
Gillet, Sophie	mailto:gilletsophie@yahoo.fr	féminin
Hubert, Noah	mailto:gilletsophie@yahoo.fr	inconnu
Delporte, Lena	mailto:delphine.chaput@gmail.com	féminin
Buis, Rénan	mailto:valeriestroobants7@gmail.com	masculin
Piérard, Lauriane	mailto:lauriane.pierard@hotmail.com	féminin
Di Tomaso, Maïte	mailto:maite.ditomaso@gmail.com	féminin
Lecroart, Rémi	mailto:maite.ditomaso@gmail.com	masculin
Lecroart, Chloé	mailto:maite.ditomaso@gmail.com	féminin
Slimani, Jannah	mailto:coune.severine@gmail.com	féminin
Plasman, Bastian	mailto:deharengsylvie@gmail.com	masculin
Crêvecoeur, Elisa	mailto:olesiakravtchouk@gmail.com	féminin
Lebrun, Oscar	mailto:alicelienart@hotmail.com	masculin
Lebrun, Elise	mailto:alicelienart@hotmail.com	féminin
Delval, Maryse	mailto:maryse_delval@hotmail.com	féminin
Irza, Laora	mailto:maryse_delval@hotmail.com	féminin
Stranera Clobours, Cassandra	mailto:sylvieclobours@yahoo.be	féminin
Vercoutere, Jules	mailto:clotildeviaene@yahoo.com	masculin
Viaene, Clothilde	mailto:clotildeviaene@yahoo.com	féminin
Francis, Valérie	mailto:valfrancis83@icloud.com	féminin
Davister, Clémence	mailto:valfrancis83@icloud.com	féminin
Vercoutere, Léopold	mailto:clotildeviaene@yahoo.com	masculin
Clobours, Sylvie	mailto:sylvieclobours@yahoo.be	féminin
D'Hooghe, Margaux	mailto:miliedhooghe@gmail.com	féminin
Blanpain, Anne-Catherine	mailto:davidlaloy@hotmail.com	féminin
Laloy, Mélodie	mailto:davidlaloy@hotmail.com	féminin
COURAET, Lucie	mailto:taody@hotmail.com	féminin
Moulart, Clara	mailto:vero.maes@gmail.com	féminin
VANSCHOONWINKEL, Charline	mailto:christianvan1729@hotmail.com	féminin
VANSCHOONWINKEL, Elyna	mailto:christianvan1729@hotmail.com	féminin
Lewkowicz, Laurence	mailto:l-laurence1981@hotmail.com	féminin
Waignon, Nathan	mailto:l-laurence198@hotmail.com	masculin
Noël, Stéphanie	mailto:s.noel.delforge@gmail.com	féminin
Delforge, Romane	mailto:s.noel.delforge@gmail.com	féminin
Delforge, Adrien	mailto:s.noel.delforge@gmail.com	masculin
Courtin, Brigitte	mailto:bcourtin@hotmail.com	féminin
Algrain, Guillaume	mailto:pirsouljulie@hotmail.com	masculin
Colot, Eléanor	mailto:isamignon@gmail.com	féminin
Colot, Jules	mailto:isamignon@hotmail.com	masculin
Thierens, Laureen	mailto:thierens.laureen@gmail.com	féminin
Namèche, Guillaume	mailto:guillaume.nameche@hotmail.com	masculin
Filali, Sarah	mailto:filalisarah@gmail.com	féminin
Itterbeek, Iris	mailto:filalisarah@gmail.com	féminin
Itterbeek, Noah	mailto:filalisarah@gmail.com	masculin
Maes, Jacques	mailto:jac@jaf.be	masculin
Moulart, Eliott	mailto:veromaes@gmail.com	masculin
Plasman, Corenthin	mailto:deharengsylvie@gmail.com	masculin
de Marneffe, Marine	mailto:a_demarneffe@hotmail.com	féminin
de Marneffe, Manon	mailto:a_demarneffe@hotmail.com	féminin
Martiat, Geneviève	mailto:genevieve.martiat@gmail.com	féminin
Henon, Gaëlle	mailto:gahenon@hotmail.com	féminin
Biston, Nancy	mailto:bistonnancy@yahoo.fr	féminin
Laduron, Léa	mailto:bistonnancy@yahoo.fr	féminin
Hootele, Romane	mailto:genevieve.martiat@gmail.com	féminin
Hootele, Chloé	mailto:genevieve.martiat@gmail.com	féminin
Henon-Deknop, Juliette	mailto:gahenon@hotmail.com	féminin
Van Hoeck, Léa	mailto:gahenon@hotmail.com	féminin
D'Hooghe, Emile	mailto:miliedhooghe@gmail.com	féminin
Goffinet, Floriane	mailto:goffinetfloriane@gmail.com	féminin
Veiga Martos, Tiago	mailto:goffinetfloriane@gmail.com	masculin
Hyde, Anne-Christine		féminin
Franck, Anne-Naomy		féminin
Paquay, Clémence	mailto:basecqgwen@yahoo.fr	féminin
Paquay, Juliette	mailto:basecqgwen@yahoo;fr	féminin
Louette, Audrey	mailto:audrey7781@gmail.com	féminin
Piraux, Josiane	mailto:alina0781@outlook.com	féminin
de Marneffe, Amaury	mailto:a_demarneffe@hotmail.com	masculin
Lesuisse, François	mailto:carrefour@distrisuisse.be	masculin
Errembault, Paul (Semeurs d'histoires)	mailto:paul.errembault@outlook.com	masculin
Marlier, Christine	mailto:christinemarlier02@gmail.com	féminin
Monnoyer, Caroline	mailto:caromonnoyer12@hotmail.com	féminin
Missair, Dominique	mailto:dominique.missair@hotmail.com	féminin
Deschamps, Annie		féminin
Orban, Aloys	mailto:quentinorban@yahoo.com	masculin
Orban, Quentin	mailto:quentinorban@yahoo.com	masculin
Seveignes, Isabelle	mailto:i.seveignes@hotmail.fr	féminin
Gillis, Louise	mailto:i.seveignes@hotmail.fr	féminin
Gillis, Manon	mailto:i.seveignes@hotmail.fr	féminin
Gillis, Camille	mailto:i.seveignes@hotmail.fr	féminin
Curpan, Mina	mailto:curpan.mihaigabriel@yahoo.com	féminin
Basecq, Gwendoline	mailto:basecqgwen@yahoo.fr	féminin
Hanrez, Stéphane	mailto:hanrez.stephane@gmail.com	masculin
Allard, Christine	mailto:chrisallard73@yahoo.com	féminin
Lognay, Alysson	mailto:chrisallard@yahoo.com	féminin
Lucas, Chloé	mailto:lorenalucastomas@hotmail.com	féminin
Lucas, Lorena	mailto:lorenalucastomas@hotmail.com	féminin
Dehareng, Jacqueline (Semeurs d'histoires)	mailto:jacquelinegerard.dehareng@yahoo.fr	féminin
Dodemont, Cédric	mailto:cedric.dodemont@gmail.com	masculin
Joassin, Audrey	mailto:audreyjoassin@hotmail.com	féminin
Dodemont, Romain	mailto:cedric.dodemont@gmail.com	masculin
Dodemont, Sarah	mailto:cedric.dodemont@gmail.com	féminin
Delvaux, Camille	mailto:audreyjoassin@hotmail.com	féminin
Delvaux, Manon	mailto:audreyjoassin@hotmail.com	féminin
Aubecq, Ysaline	mailto:vincent.nadine@yahoo.fr	féminin
Aubecq, Matteo	mailto:vincent.nadine@yahoo.fr	masculin
Minne, Geoffrey	mailto:minnegeoffrey@hotmail.com	masculin
Minne, Olivia	mailto:minnegeoffrey@hotmail.com	féminin
Drappier, Chloé	mailto:drappier.vanhove@gmail.com	féminin
NOE, André	mailto:hesbaye.artois@skynet.be	masculin
Kejzman, Stéphanie	mailto:kejzmans@gmail.com	féminin
Grêde, Pasqualina	mailto:pasqualina.grede@gmail.com	féminin
Vanhamme, Arthur	mailto:vanhammearthur@gmail.com	masculin
Krirem, Louna-Kim	mailto:pasqualina.grede@gmail.com	féminin
Spreutels, Maïwenn	mailto:etranson@yahoo.fr	féminin
Spiritus, Laure (Semeur d'histoires)	mailto:laure_spiritus@yahoo.fr	féminin
Van Hentenryk, Charline	mailto:p.vanhentenryk@gmail.com	féminin
Van Hentenryk, Erine	mailto:p.vanhentenryk@gmail.com	féminin
Van Hentenryk, Lucile	mailto:p.vanhentenryk@gmail.com	féminin
Humblet, Diego	mailto:tibou2008@hotmail.com	masculin
Liefooghe, Pierre	mailto:nathplom@hotmail.com	masculin
Liefooghe, Gaspard	mailto:nathplom@hotmail.com	masculin
Siperius, Théo	mailto:delphineetcedric@hotmail.fr	masculin
Godfriaux, Rosalie	mailto:helene.warnier@hotmail.com	féminin
Godfriaux, Elodie	mailto:helene.warnier@hotmail.com	féminin
Godfriaux, Simon	mailto:helene.warnier@hotmail.com	masculin
Ducarme, Roxane	mailto:chloebehets@gmail.com	féminin
Ducarme, Thomas	mailto:chloebehets@gmail.com	masculin
Ducarme, Cyril	mailto:chloebehets@gmail.com	masculin
Behets, Chloé	mailto:chloebehets@gmail.com	féminin
Boute, Charlotte	mailto:charlotteboute@hotmail.com	féminin
Simon, Orkhan	mailto:charlotteboute@hotmail.com	masculin
Simon, Liola	mailto:charlotteboute@hotmail.com	féminin
Decleer, Manon	mailto:geraldine.tkint@gmail.com	féminin
Decleer, Aldéric	mailto:geraldine.tkint@gmail.com	masculin
Brodkom, Danièle	mailto:danielebrodkom@hotmail.com	féminin
Raquet, Aurélie	mailto:halkinfrancoise@hotmail.com	féminin
Lorenzetti, Ornella	mailto:lorenzettiornella@yahoo.com	féminin
Dante, Martino	mailto:ornellalorenzetti@yahoo.com	masculin
Marichal, Anne-Laure	mailto:almarichal@hotmail.com	féminin
Lefèvre, Aurélie	mailto:lefevreaurelie90@gmail.com	féminin
Hubert, Lorentz	mailto:lefevreaurelie90@gmail.com	féminin
Van Mansart, Thomas	mailto:meunierjuly@hotmail.com	masculin
Van Mansart, Célestin	mailto:meunierjuly@hotmail.com	masculin
Van Mansart, Clément	mailto:meunierjuly@hotmail.com	masculin
Transon, Emilie	mailto:etranson@yahoo.fr	féminin
Bauduin, Sorenn	mailto:karelle.duprez@hotmail.com	féminin
Vandeloise, Estelle	mailto:laurence.bervoets@hotmail.com	féminin
Vandeloise, Célia	mailto:laurence.bervoets@hotmail.com	féminin
PAREE, Yolande (Semeuse d'Histoires)	mailto:yolande-paree@hotmail.com	féminin
Fournaise, Christelle	mailto:fournaisech@hotmail.com	féminin
Germinal, Candy	mailto:cgerminal@hotmail.com	féminin
Alaimo, Souad	mailto:ets.serala@hotmail.com	féminin
Geeraerts, Lara	mailto:cgerminal@hotmail.com	féminin
Ilongo Basosabi, Christian	mailto:basosabi@outlook.fr	masculin
Ilongo Basosabi, Léon	mailto:basasobi@outlook.fr	masculin
Buzzamaz, Hanane	mailto:hanane.buzzamaz@gmail.com	féminin
Debuisson, Geoffray	mailto:debuisson-hdidou@live.be	masculin
Debuisson, Anyssa	mailto:debuisson-hdidou@live.be	féminin
Debuisson, Lukas	mailto:debuisson-hdidou@live.be	masculin
Debuisson, Luna	mailto:debuisson-hdidou@live.be	féminin
De Brouwer, Véronique	mailto:veronique_debrouwer@skynet.be	féminin
Bourtembourg, Gaëlle	mailto:gaelle.bourtembourg@gmail.com	féminin
Loiseau, Anna	mailto:gaelle.bourtembourg@gmail.com	féminin
Loiseau, Pauline	mailto:gaelle.bourtembourg@gmail.com	féminin
Van Weyenbergh, Faustine	mailto:cedrinedel@hotmail.com	féminin
Zoppé, Antoine	mailto:martinemeessen@yahoo.fr	masculin
Zoppé, Juliette	mailto:martinemeessen@yahoo.fr	féminin
Van Weyenbergh, Maïeul	mailto:cedrinedel@hotmail.com	masculin
Meurisse, Basile	mailto:cedrinedel@hotmail.com	masculin
Duprez, Karelle	mailto:karelle.duprez@hotmail.com	féminin
Vanspauwen, Pierre	mailto:pierre.vanspauwen@belgacom.net	masculin
Tiers, Maiwenn	mailto:maiwenntiers@gmail.com	féminin
Beaufays, Samuel	mailto:maiwenntiers@gmail.com	masculin
Bauduin, Silcire	mailto:karelle.duprez@hotmail.com	féminin
Delvigne, Joachim	mailto:mdelmarquette@live.be	masculin
Ghinet, Isabelle	mailto:isaghinet@hotmail.com	féminin
HUYGHE, Eline	mailto:isaghinet@hotmail.com	féminin
HUYGHE, Lauranne	mailto:isaghinet@hotmail.com	féminin
Conil, Jean-Gabriel	mailto:jeangab.conil@gmail.com	masculin
Despontin, Maxime	mailto:magaly.stamanne@gmail.com	masculin
Despontin, Lilian	mailto:magaly.stamanne@gmail.com	féminin
Van Lierde, Camille	mailto:magaly.stamanne@gmail.com	féminin
Riticella, Laura	mailto:lauretta23429@hotmail.it	féminin
Riticella, Elisa	mailto:lauretta23429@hotmail.it	féminin
Du Jardin, Léontine	mailto:marielepolain@gmail.com	féminin
Du Jardin, Madeleine	mailto:marielepolain@gmail.com	féminin
Du Jardin, Philibert	mailto:marielepolain@gmail.com	masculin
Struyf, Louise	mailto:melanie.flagothier@jti.com	féminin
Perwez - Collège Da Vinci - Sciences	mailto:laetitiaguerdon@gmail.com	
de Beer, Stéphanie	mailto:stephanie.debeer@gmail.com	féminin
Missa, Elise	mailto:bmissa1@yahoo;fr	féminin
Missa, Scott	mailto:bmissa1@yahoo.fr	masculin
Clayton, Lola	mailto:thomas.clayton@hotmail.com	féminin
Van Asbroeck, Arabelle	mailto:charletjulie@hotmail.com	féminin
Van Asbroeck, Gaston	mailto:charletjulie@hotmail.com	masculin
Delvigne, Camille	mailto:mdelmarquette@live.be	féminin
Delvigne, Jade	mailto:mdelmarquette@live.be	féminin
Delvigne, Maëlle	mailto:mdelmarquette@live.be	féminin
Scoriel, Jennifer	mailto:jenniferscoriel@hotmail.be	féminin
FORET, Jimmy	mailto:jimmy1809@outlook.be	masculin
Huppaye - Ecole Saint-Jean-Baptiste - 2e Primaire	mailto:majoiemarie@hotmail.com	
Mottoulle, Catherine	mailto:cath77@live.be	féminin
Robbe, Alix	mailto:carolinehalleux@gmail.com	féminin
Robbe, Anne	mailto:carolinehalleux@gmail.com	féminin
Fastres, Selene	mailto:jenniferscoriel@hotmail.be	féminin
Bridot-Tissier, Noa	mailto:lietard_delphine@hotmail.com	masculin
Thonnon, Alex	mailto:lot.goris@yahoo.com	masculin
Thonnon, Matthias	mailto:lot.goris@yahoo.com	masculin
Thonnon, Emma	mailto:lot.goris@yahoo.com	féminin
Stamanne, Magaly	mailto:magaly.stamanne@gmail.com	féminin
HUBERT, Caroline	mailto:hubertcaroline13@hotmail.com	féminin
DUCHENE, Vanina	mailto:hubertcaroline13@hotmail.com	féminin
Michiels, Christel	mailto:ch.michiels@skynet.be	féminin
Van de Werve, Louis	mailto:ch.michiels@skynet.be	masculin
Delmarquette, Marie	mailto:mdelmarquette@live.be	féminin
Goris, Lot	mailto:lot.goris@yahoo.com	féminin
LACOURT, Arlette	mailto:mamy.arlette@hotmail.be	féminin
Lietard, Delphine	mailto:lietard_delphine@hotmail.com	féminin
Janssen, Katleen	mailto:katleen1.janssen@gmail.com	féminin
Plompteux, Nathalie	mailto:nathplom@hotmail.com	féminin
Quintin, Nell	mailto:katleen1.janssen@gmail.com	féminin
Quintin, Brieuc	mailto:katleen1.janssen@gmail.com	masculin
Polet, Hervé	mailto:rv-polet@hotmail.com	masculin
Warnier, Hélène	mailto:helene.warnier@hotmail.com	féminin
Robbe, Benoît	mailto:carolinehalleux@gmail.com	masculin
Colamarino, Laura	mailto:lauretta23429@hotmail.it	féminin
Buis, Cathy	mailto:buis.cathy@gmail.com	féminin
Couturiaux, Maëlle		féminin
Perwez - Ecole Jean-Paul II - 4e Primaire	mailto:marie-ange-eddy@hotmail.be	
Nouveau lecteur 3		
Chaput, Delphine Anne	mailto:delphine.chaput@gmail.com	féminin
Missa, Bertrand	mailto:bmissa1@yahoo.fr	masculin
Kameza, Micheline	mailto:kamezamicheline@gmail.com	féminin
Petit, Johanna	mailto:eldjojo@hotmail.be	féminin
Wilmart, Maude	mailto:maudoux84@hotmail.com	féminin
Sersté, Arthur	mailto:maudoux84@hotmail.com	masculin
Sersté, Charline	mailto:maudoux84@hotmail.com	féminin
Vanneste, Anthony	mailto:catetchris.debuisson@gmail.com	masculin
Martens, Danielle	mailto:daniellemartens1@gmail.com	féminin
Lignier, Roxane	mailto:roxanelignier@habitis.be	féminin
Geortay, Nathalie	mailto:geortaynathalie75@gmail.com	féminin
Thirion, Elea	mailto:geortaynathalie75@gmail.com	féminin
Thirion, Louyse	mailto:geortaynathalie75@gmail.com	féminin
Goffe, Aline	mailto:alinegoffe@gmail.com	féminin
Hosselet, Justine	mailto:justinehosselet15@gmail.com	féminin
Nouveau lecteur 1		
Gijre, Julien	mailto:stephane.gijre@gmail.com	masculin
Gijre, Lucie	mailto:stephane.gijre@gmail.com	féminin
JANSSENS, Valérie	mailto:valoujans@yahoo.fr	féminin
Perwez - LIRE et ECRIRE	mailto:dominique.annet@lire-et-ecrire.be	féminin
Yuksek, Songul	mailto:yukseksongul@live.be	féminin
Clayton, Thomas	mailto:thomas.clayton@hotmail.com	masculin
Fossoul, Gatien	mailto:jibeaga@gmail.com	masculin
Fossoul, Tibère	mailto:jibeaga@gmail.com	masculin
Bourgogne, Jean-Luc	mailto:bourgognejeanluc@gmail.com	masculin
Urbain, Margaux	mailto:urbainmargaux@gmail.com	féminin
Perwez - Présélection Versele		
Gijre, Stéphane	mailto:stephane.gijre@gmail.com	masculin
Coppens, Véronique	mailto:vv.coppens@gmail.com	féminin
CEUPPENS, Quentin	mailto:qceuppens@hotmail.com	masculin
CEUPPENS, Gilles	mailto:qceuppens@hotmail.com	masculin
Fossoul, Achille	mailto:jibeaga@gmail.com	masculin
Lepage, Aymeric		masculin
Berghman, Dominique	mailto:dominique.berghman@hotmail.com	masculin
Noël, Virginie	mailto:infivirginienoel@gmail.com	féminin
Genard, Amandine	mailto:dujardincl@gmail.com	féminin
Theatre, Raphaël	mailto:raphael.theatre@gmail.com	masculin
Theatre, Gabriel	mailto:raphael.theatre@gmail.com	masculin
Crutzen, Marie		féminin
Kayobotsi, Edith	mailto:ekayobotsi@gmail.com	féminin
Delcomminette, Thimothe	mailto:susy@dirick.fr	masculin
Vassen, Charles-Antoine	mailto:ekayobotsi@gmail.com	masculin
Vassen, Camille	mailto:ekayobotsi@gmail.com	féminin
Snappe, Nathan	mailto:snappej@hotmail.com	masculin
Snappe, Alix	mailto:snappej@hotmail.com	féminin
Deakin, Aroua	mailto:arouadeakin@live.be	féminin
Meese, William	mailto:arouadeakin@live.be	masculin
Eppe, Eva	mailto:audrey_coquelet@hotmail.com	féminin
Eppe, Hugo	mailto:audrey_coquelet@hotmail.com	masculin
Decleer, Isaure	mailto:geraldine.tkint@gmail.com	féminin
Dumont, Julie	mailto:julie.dumont89@gmail.com	féminin
Genard, Alexis	mailto:dujardincl@gmail.com	masculin
De Simoni, Alex	mailto:marionpichaud7@gmail.com	masculin
Balint, Orsolya	mailto:orsolya.balint@hotmail.com	féminin
Francis, Nadia	mailto:nadia_francis@hotmail.com	féminin
Vanlangendonck, Loïc	mailto:nadia_francis@hotmail.com	masculin
Lacroix, Alice	mailto:alice.gregoire@hotmail.com	féminin
Martins, Camille	mailto:anne.sophie.coppens@gmail.com	féminin
Vandevelde, Philippe	mailto:vande.phil06@hotmail.com	masculin
Desaintes, Quentin	mailto:geraldine.delehoye@gmail.com	masculin
Desaintes, Hugo	mailto:geraldine.delehoye@gmail.com	masculin
Vandevelde, Loreleî	mailto:sarahcolasse@hotmail.com	féminin
Coppens, Anne-Sophie	mailto:anne.sophie.coppens@gmail.com	féminin
Verniers, Jessica	mailto:jessicaverniers64@gmail.com	féminin
Martins, Pauline	mailto:anne.sophie.coppens@gmail.com	féminin
Frédéric, Célestine	mailto:alice.gregoire@hotmail.com	féminin
De Quirini, Claire	mailto:clairedequirini@yahoo.fr	féminin
Cneudt, Magalie	mailto:mag-ice@hotmail.com	féminin
Devisscher, Nina	mailto:mag-ice@hotmail.com	féminin
Van Overmeere, Caroline	mailto:caro04.vo@gmail.com	féminin
Noël, Christel	mailto:christelnoel.h2o@gmail.com	féminin
Thauvoye, Chloé	mailto:c_dumont@live.be	féminin
Sid Miranda, Léonard	mailto:mirandamirandalisa@yahoo.fr	masculin
Bossut, Alexandre	mailto:nbossut@gmail.com	masculin
Frederic, Emile	mailto:caromonnoyer12@hotmail.com	masculin
Philippot, Valérie	mailto:valphi@outlook.be	féminin
Simon, Nathalie	mailto:nathsims@hotmail.com	féminin
Libouton, Ann-Sophie	mailto:annsophielibouton@hotmail.com	féminin
de Meyere, Valérie	mailto:valerie.demeyere@live.be	féminin
Alexandre, Maydisson	mailto:maydisson.a@hotmail.com	féminin
Pochet, Nicolas	mailto:alisonicolaspochet@gmail.com	masculin
Frederic, Lucien	mailto:alice.gregoire@hotmail.com	masculin
Rotella, Amadeo	mailto:maydisson.a@hotmail.com	masculin
Pochet, Raphaël	mailto:alisonnicolaspochet@gmail.com	masculin
Simar, Benjamin	mailto:valerie.demeyere@live.be	masculin
Devisscher, Léo	mailto:mag-ice@hotmail.com	masculin
Mathy, Nélia	mailto:julie.dumont89@gmail.com	féminin
Mathy, Izao	mailto:julie.dumont89@gmail.com	masculin
Paquet, Eva	mailto:christelnoel.h20@gmail.com	féminin
Demeuse, Amaury	mailto:eleonorerifon@gmail.com	masculin
Lebrun, Raphaël	mailto:eleonorerifon@gmail.com	masculin
Lust, Jules	mailto:m.marchal.lust@gmail.com	masculin
Lust, Charly	mailto:m.marchal.lust@gmail.com	masculin
Balint, Anaïs	mailto:orsolya.balint@hotmail.com	féminin
Van de Cauter, Ambre	mailto:mfbavoillot22@gmail.com	féminin
Porcel-Moya, Amalia	mailto:valphi@outlook.be	féminin
Archambeau, Sacha	mailto:carolinebusschaert@gmail.com	masculin
Busschaert, Caroline	mailto:carolinebusschaert@gmail.com	féminin
Clément, Audrey	mailto:audreyclement@hotmail.com	féminin
Hendrickx, Louis	mailto:annsophielibouton@hotmail.com	masculin
Hendrickx, Clémence	mailto:annsophielibouton@hotmail.com	féminin
Hardman, Mathis	mailto:nathsims@hotmail.com	masculin
Flament, Nathan	mailto:audreyclement@hotmail.com	masculin
Flament, Matthew	mailto:audreyclement@hotmail.com	masculin
Taverniers, Aurélien	mailto:cedric.taverniers@hotmail.com	masculin
Capela, Gabriel	mailto:cleofizz@gmail.com	masculin
Capela, Nina	mailto:cleofizz@gmail.com	féminin
Capela, Marylou	mailto:cleofizz@gmail.com	féminin
Tondeur, Amory	mailto:amory.tondeur@gmail.com	masculin
Tondeur, Maxime	mailto:amory.tondeur@gmail.com	masculin
Marit, Maël	mailto:virginieleener@hotmail.com	masculin
Meyts, Michael	mailto:michael.meyts@gmail.com	masculin
Van Brussel, Charlotte	mailto:charlotte.vb74@gmail.com	féminin
Schillaci, Alessio	mailto:isabelle.ceulemans77@gmail.com	masculin
Schillaci, Enzo	mailto:isabelle.ceulemans77@gmail.com	masculin
Leener, Virginie	mailto:virginieleener@hotmail.com	féminin
Struys, Sabine	mailto:sabinestruys@yahoo.fr	féminin
Formisani, Arthur	mailto:charlotte.vb74@gmail.com	masculin
Darte, Maelyce	mailto:duchmj@gmail.com	féminin
Formisani, Thomas	mailto:charlotte.vb74@gmail.com	masculin
Formisani, Alissia	mailto:charlotte.vb74@gmail.com	féminin
Delperdange, Cyril	mailto:lambert_val@hotmail.com	masculin
Duriaux, Nancy	mailto:nancyduriaux@gmail.com	féminin
Dandrimont, Guillaume	mailto:nancyduriaux@gmail.com	masculin
Dandrimont, Louise	mailto:nancyduriaux@gmail.com	féminin
Pirsoul, Béatrice	mailto:beatrice_pirsoul@hotmail.com	féminin
Dufond, Didier	mailto:didierdufond@gmail.com	masculin
Loix, Arthur	mailto:carolineloix@hotmail.com	masculin
Loix, Louis	mailto:carolineloix@hotmail.com	masculin
Loix, Estelle	mailto:carolineloix@hotmail.com	féminin
Dufond, Danaée	mailto:didierdufond@gmail.com	féminin
Dupont, Harry	mailto:sabinestruys@yahoo.fr	masculin
Dupont, Benjamin	mailto:sabinestruys@yahoo.fr	masculin
Dupont, Emmy	mailto:sabinestruys@yahoo.fr	masculin
Van Oppens, Alice	mailto:xva@rtbf.be	féminin
Van Oppens, Théo	mailto:xva@rtbf.be	masculin
Lempereur, Aline	mailto:alempereur.logo@gmail.com	féminin
Malevé, Anne-Marie	mailto:anne@hougardy.net	féminin
Charles, Virginie	mailto:vmc33272@yahoo.fr	féminin
Duchenne, Marie-Julie	mailto:duchmj@gmail.com	
De Groot, Lisa	mailto:lisa.degroot@outlook.com	féminin
Dabe, Lois	mailto:vmc33272@yahoo.fr	féminin
Dinjart, Vinciane	mailto:vincianedinjart@gmail.com	féminin
Glatigny, Didier	mailto:glatignydidier@gmail.com	masculin
Baillet, Géraldine	mailto:geraldinebaillet@hotmail.com	féminin
de Sauvage Vercour, Anne	mailto:annedesauvage@yahoo.fr	féminin
Luyckx, Ludivine	mailto:luluyckx@hotmail.com	féminin
Bonsignore, Achille	mailto:luluyckx@hotmail.com	masculin
Barras, Marcus	mailto:alempereur.logo@gmail.com	masculin
Parvais, Alexane	mailto:rheinhardsara@hotmail.com	féminin
Lepage, Clara	mailto:eldjojo@hotmail.be	féminin
Lepage, Elisa	mailto:eldjojo@hotmail.be	féminin
Dierickx, Grégoire	mailto:gaelle196@hotmail.com	masculin
Lieutenant, Marine		féminin
MANDELAIRE, Serge	mailto:mandelser@gmail.com	masculin
Dierickx, Gatien	mailto:gaelle196@hotmail.com	masculin
Simonaer, Sophie	mailto:soso_isa@hotmail.com	féminin
Debrulle, Arthur	mailto:so_soisa@hotmail.com	masculin
Debrulle, Zelie	mailto:soso_isa@hotmail.com	féminin
Brohet, Thibaut	mailto:tbrohet@hotmail.com	masculin
Degand, Emeline	mailto:g_laeticia@hotmail.com	féminin
Degand, Alexis	mailto:g_laeticia@hotmail.com	masculin
Ngalamulume, Volmi	mailto:angregokap@yahoo.fr	
Geeurickx, Lucas	mailto:steph_paternotte@hotmail.com	masculin
Geeurickx, Louise	mailto:steph_paternotte@hotmail.com	féminin
Geeurickx, Léo	mailto:steph_paternotte@hotmail.com	masculin
Bertrand, Emilie	mailto:emilie;bertrand2019@gmail.com	féminin
François, Noéline	mailto:catherinefofolle13@hotmail.com	féminin
Plasman, Nèle	mailto:chapignon@gmail.com	féminin
Prévot, Yvette	mailto:yvetteprevot@yahoo.fr	féminin
Van Hamme, Julie	mailto:vanhamme_julie@yahoo.fr	féminin
Nouwynck, Maxime	mailto:vanhamme_julie@yahoo.fr	masculin
Nouwynck, Antoine	mailto:vanhamme_julie@yahoo.fr	masculin
Nouwynck, Clément	mailto:vanhamme_julie@yahoo.fr	masculin
Hollander, Fabrice	mailto:fabrice_hollander@yahoo.com	masculin
Hollander, Loris	mailto:fabrice_hollander@yahoo.com	masculin
Hollander, Matti	mailto:fabrice_hollander@yahoo.com	masculin
Sirghi, Rodica	mailto:rodica.sirghi.80@gmail.com	féminin
Sirghi, Eros	mailto:rodica.sirghi.80@gmail.com	masculin
Sirghi, Raphaël	mailto:rodica.sirghi.80@gmail.com	masculin
Sirghi, Harmonie	mailto:rodica.sirghi.80@gmail.com	féminin
Van Welssenaers, Gaëlle	mailto:gaelle196@hotmail.com	féminin
Genin, Laeticia	mailto:g_laeticia@hotmail.com	féminin
Froidmont, Achille	mailto:charlotte.quoirin@gmail.com	masculin
Froidmont, Albane	mailto:charlotte.quoirin@gmail.com	féminin
Vanspauwen Santy, Raphaël	mailto:afsanty@belgacom.net	masculin
Vanspauwen Santy, Mathieu	mailto:afsanty@belgacom.net	masculin
Afram, Melinda	mailto:melinda.afram@gmail.com	féminin
Vanderwegen, Maxime	mailto:maximevanderwegen@disroot.org	masculin
BROUWERS, Sabine	mailto:brouwerssabine@gmail.com	féminin
Thirionet, Maureen	mailto:maureenthirionet@hotmail.fr	féminin
Marchal, Constance	mailto:constance_marchal@hotmail.com	féminin
Constant, Bastien	mailto:bastien_constant@icloud.com	masculin
Constant, Arthur	mailto:bastien_constant@icloud.com	masculin
Constant, Marrgaux	mailto:bastien_constant@icloud.com	féminin
Stamatakis, Bahizi	mailto:celine.stamakis@gmail.com	féminin
Marlier, Emilien	mailto:val1109@hotmail.com	masculin
Bahili, Nora	mailto:celine.stamatakis@gmail.com	féminin
Bahili, Andrea	mailto:celine.stamakis@gmail.com	féminin
Callaerts, Virginie	mailto:v.callaerts@live.fr	féminin
Grauwels, Barbara	mailto:grauwels.barbara@gmail.com	féminin
Genot, Hoëlle	mailto:hoellegenot@hotmail.com	féminin
Delhaye, Loïc	mailto:sandrine.swennen@gmail.com	masculin
Grolman, Jonathan	mailto:jonathan.grolman@gmail.com	masculin
Ceuppeurs, Maëlly	mailto:kelly-taelmeester@hotmail.com	féminin
Istasse, Léna	mailto:thiflore1@gmail.com	féminin
Vaireanu, Loutchiane	mailto:lyriazada@hotmail.com	masculin
Vaireanu, Cara	mailto:lyriazada@hotmail.com	féminin
Istasse, Emy	mailto:thiflore1@gmail.com	féminin
Arickx, Estelle	mailto:grauwels.barbara@gmail.com	féminin
Arickx, Soline	mailto:grauwels.barbara@gmail.com	féminin
Henry, Florine	mailto:isafredlln@hotmail.com	féminin
Henry, Thibault	mailto:isafredlln@hotmail.com	masculin
Midik		
Slimani, Shéryn	mailto:coune.severine@gmail.com	féminin
Bernar, Henri	mailto:beatrice_pirsoul@hotmail.com	masculin
Legros, Juliette	mailto:mariesimon09@hotmail.com	féminin
Legros, Léo	mailto:mariesimon09@hotmail.com	masculin
Legros, Lola	mailto:mariesimon09@hotmail.com	féminin
Perwez - Résidence Trémouroux	mailto:dominique.bailleux@cpasperwez.be	
Hannon, Florence	mailto:florence.hannon52@gmail.com	féminin
BOURTEMBOURG, Théa	mailto:laurent.btbg@gmail.com	féminin
D'Haese, Monique	mailto:labiousemonique37@gmail.com	féminin
Perwez - Ecole Jean-Paul II -1e et 2e Maternelles	mailto:benebodart1@outlook.com	masculin
Thirion, Martine	mailto:lamalle.martine@outlook.be	féminin
Timsonet, Sandrine	mailto:sandrine_timsonet@hotmail.com	féminin
Goossens, Elisabeth	mailto:elisabeth.goossens45@gmail.com	féminin
Pierard, Thibault	mailto:nathalie.maniquet@engie.com	masculin
Kapinga Ngindu, Angèle	mailto:angregokap@yahoo.fr	féminin
Delhaye, Geneviève	mailto:gdelhaye@live.be	féminin
Thibaux, Marie-Louise		féminin
Animôme- Thorembais-St-Trond	mailto:extrascolperwez@gmail.com	féminin
Animômes-Orbais	mailto:extrascolperwez@gmail.com	féminin
Animômes Th-les-Béguines	mailto:extrascolperwez@gmail.com	masculin
Tortolani, Maggy	mailto:maggy.tortolani@yahoo.com	féminin
Animômes - Brabant	mailto:extrascolperwez@gmail.com	féminin
Animômes-Tourterelles	mailto:extrascolperwez@gmail.com	féminin
Dewageneer, Sébastien	mailto:sebdewa@gmail.com	masculin
Dewageneer, Inès	mailto:sebdewa@gmail.com	féminin
Mestdagh, Mariska	mailto:mariska.mestdagh@skynet.be	féminin
Deraet, Laurence	mailto:laurence.deraet@uclouvain.be	féminin
Malèves-Sainte-Marie - Ecole communale - 1e maternelle	mailto:fabienne.seutin@gmail.com	
Piette, Roseline	mailto:roseline.piette@nyala.be	féminin
Den Dauw, Caroline	mailto:carolinesandron@gmail.com	féminin
Massart, Rolande		féminin
Mirguet, Sabine	mailto:sabine.mirguet@gmail.com	féminin
Costaganna, André	mailto:mjoseetrem@voo.be	masculin
Bombeeck, Jean-François	mailto:jeanfrancoisbombeeck@gmail.com	masculin
Weron, Véronique	mailto:veronique.weron@live.com	féminin
Candael, Isabelle	mailto:isabellecandael@hotmail.com	féminin
Hennebert, Claire	mailto:atelier.eclaire@gmail.com	féminin
WATHELET, André	mailto:awathelet@voo.be	masculin
Moldenaers, Cécile	mailto:cilmoldu@gmail.com	féminin
SCHLECK, Marie-Louise	mailto:marielouise.schleck@gmail.com	féminin
GILSON, Valérie	mailto:val-gilson@hotmail.com	féminin
Perwez - Ecole communale - Accueil	mailto:val-gilson@hotmail.com	
Clément, Sabrina	mailto:sabrinaclement81@hotmail.com	féminin
Callens, Maryse	mailto:fwacquier@skynet.be	féminin
SOUMILLION, Patrice	mailto:qogacio@gmail.com	masculin
Velge, Gaëlle	mailto:g_velge@yahoo.fr	féminin
Vandevoorde, Fabrice	mailto:vdvfab@gmail.com	masculin
Rogie, Maya	mailto:g_velge@yahoo.fr	féminin
Santy, Anne-Françoise	mailto:afsanty@belgacom.net	féminin
Hilgers, Odile	mailto:odile.hilgers@gmail.com	féminin
Roosen, Christine	mailto:christineroosen@yahoo.fr	féminin
Kesteman, Aloïs	mailto:caroline_matagne@hotmail.com	masculin
Henry, Frederic	mailto:isafredlln@hotmail.com	masculin
Devos, Marie-Laurence	mailto:mldevosbael@gmail.com	féminin
Guerin, Caroline	mailto:djo789@yahoo.fr	féminin
Vens, Jessica	mailto:vens.j@hotmail.com	féminin
Samijn, Julie	mailto:julie.samijn@gmail.com	féminin
Wernerus, Sabine	mailto:sabine.wernerus@gmail.com	féminin
Peeters, Florence	mailto:feg.perniaux@outlook.be	féminin
Germinal, Maguy	mailto:mgerbol@hotmail.com	féminin
Laurent, Jessica	mailto:tibou2008@hotmail.com	féminin
Prouha, Marie-Cécile	mailto:cleofizz@gmail.com	féminin
Art, Christine	mailto:artchristine@hotmail.com	féminin
Raucent, Nadine	mailto:raucent@gmail.com	féminin
Wilbaut, Manoella	mailto:Manoella.wilbaut@gmail.com	féminin
Charlet, Julie	mailto:charletjulie@hotmail.com	féminin
Choux, Marie-Ange	mailto:choux.ma@hotmail.com	féminin
De Mos, Christophe	mailto:christophedemos@hotmail.com	masculin
Crevecoeur, David	mailto:crevecoeur54@gmail.com	masculin
Sikkink, Martin	mailto:aurelie.regout@gmail.com	masculin
Lambert, Fabienne	mailto:flelambert@hotmail.com	féminin
Luc, Catherine	mailto:lgeerits@outlook.com	féminin
Van Mechelen, Jean-Paul	mailto:jpvanmechelen@hotmail.com	masculin
Pace, Laurent	mailto:laulucle@hotmail.com	masculin
Plisnier, Laurence	mailto:nackaertslaurence@msn.com	féminin
Genard, Olivier	mailto:famille.genard@skynet.be	masculin
Peloso, Angeline		féminin
Vercheval, Justine	mailto:justiine1306@hotmail.com	féminin
Darripe, Florie	mailto:florie@gmail.com	féminin
Castreuil, Laurent	mailto:familleana@hotmail.com	masculin
Delmarcelle, Dania	mailto:simonvincent201079@gmail.com	féminin
Berwart, Mélanie		féminin
Demeulemeester, Pauline	mailto:vermeirendemeu@hotmail.com	féminin
Hollands, Eva	mailto:murielle.schorils@skynet.be	féminin
Braun, Sabine	mailto:sbraundetermeeren@gmail.com	féminin
Fobe, Sadhana	mailto:sadhanafobe@hotmail.com	féminin
Jandrain, Anne	mailto:anne.jandrain@hotmail.com	féminin
Geoffroy, Thomas	mailto:geoffroy.th@gmail.com	masculin
Coqlet, Natan	mailto:nathaliefontaineh2o@gmail.com	masculin
Bertrand, Fabienne	mailto:fabienne.bertrand@emploi.belgique.be	féminin
De Corte, Suzanne		féminin
Pirson, Dominique	mailto:dpdominiquepirson@gmail.com	féminin
Bosman, Jean-Pierre	mailto:jean-pierre.bosman@skynet.be	masculin
Sauvage, Geneviève	mailto:gghanquet@yahoo.fr	féminin
Annoye, Valérie	mailto:annoye_valerie@hotmail.com	féminin
MOLLE, Marie-France	mailto:marie-france.molle@proximus.be	féminin
Jabo, Clauzel		masculin
Ransquin, Béatrice	mailto:beatrice.ransquin@skynet.be	féminin
Hallet, Marie-Thérèse	mailto:psenterre@gmail.com	masculin
Cools, Etienne	mailto:gwaeterloos@gmail.com	masculin
Charlier, Cédrik	mailto:cedrik.charlier@gmail.com	masculin
NIEUWENHUYS, Jean-François	mailto:sophdapsens@gmail.com	masculin
Danvoye, Marie	mailto:mariedanvoye@yahoo.fr	féminin
Le Bailly, Cécile	mailto:cecilelebailly@hotmail.com	féminin
Collin, Stéphanie	mailto:cstephanie32@hotmail.com	féminin
BEN AHMED, Nadia	mailto:nadia.ben.ahmed.72@gmail.com	féminin
Rifon, Eleonore	mailto:eleonorerifon@gmail.com	féminin
Rosenfeld, Jacqueline	mailto:jacquelinerosenfeld@yahoo.com	féminin
Enangue, Carine	mailto:carineenangue@yahoo.fr	féminin
Gouy, Lucienne	mailto:lucienne_gouy@hotmail.com	féminin
Peeters, Raymond	mailto:raymond.peeters@keepitup.be	masculin
Piraux, Anne-Catherine	mailto:ac.piraux@hotmail.be	féminin
Smith, Elena	mailto:elena_a_smith@hotmail.com	féminin
Hébert, Céline	mailto:celine.hebert2107@gmail.com	féminin
Sabaux, Amélie	mailto:amelie.sabaux@gmail.com	féminin
Piérard, Catherine	mailto:catherinefofolle13@hotmail.com	féminin
Mathys, Bérengère	mailto:berengere.m@hotmail.com	féminin
Robert, Jennifer	mailto:flecheman1@msn.com	féminin
Pensis, Julie	mailto:julie.pensis@gmail.com	féminin
Noël, Jules	mailto:jules.noel53@gmail.com	masculin
Bervoets, Laurence	mailto:laurence.bervoets@hotmail.com	féminin
Kneip, Ariane	mailto:ariane.kneip@hotmail.fr	féminin
Curpan, Elena-Alina	mailto:curpan.mihaigabriel@yahoo.com	féminin
Gérard, Nathalie	mailto:nathgerard@msn.com	féminin
Scalais, Christiane		féminin
Perau, Gaelle	mailto:peraugaelle@hotmail.com	féminin
Vanderbecken, Baptiste	mailto:brigittehance@yahoo.fr	masculin
Vanderbecken, Emilie	mailto:emilievanderbecken@icloud.com	féminin
Flémal, Chantal	mailto:chantalflemal@gmail.com	féminin
Ernotte, Pascal	mailto:famille.ernotte@skynet.be	masculin
Echterbille, Michaël	mailto:leroissevi@msn.com	masculin
Gonzalez, Melissa	mailto:gonzamel8012@hotmail.com	féminin
JOIRET, Marie-José		féminin
BERTRAND, Germaine		féminin
Van Ormelingen, Brigitte	mailto:lovens.brigitte@gmail.com	féminin
Coomans, Chloé	mailto:chloecoomans@gmail.com	féminin
De Laminne de Bex, Fabienne	mailto:f.delaminne@gmail.com	féminin
Ciccarella, Marie	mailto:marie.ciccarella@gmail.com	féminin
Evrard, Bénédicte	mailto:benedicteevrard@hotmail.fr	féminin
Orbais - Ecole communale - 1e et 2e primaire	mailto:joel.pirson@perwez.be	
Descamps, Eric	mailto:amanileco@skynet.be	masculin
Champagne, Virginie	mailto:chavir@live.be	féminin
Courtehoux, Valérie	mailto:oxo51@me.com	féminin
Dujardin, Claire	mailto:dujardincl@gmail.com	féminin
Dewageneer, Ethan	mailto:lesskoekelberg@gmail.com	masculin
GHIJZELINGS, Muriel	mailto:muriel.ghm@gmail.com	féminin
Marin, John	mailto:johnmarin2702@gmail.com	masculin
Simon, Marie	mailto:mariesimon09@hotmail.com	féminin
Bosmans, Sylvie	mailto:sylvie.bosmans@gmail.com	féminin
Flabat, Aurélie	mailto:flabat.aurelie@yahoo.fr	féminin
Cohen-Adad, Ariane	mailto:ariane.cohenadad@gmail.com	féminin
Charlet, Jacqueline	mailto:jacqueline.charlet@skynet.be	féminin
Mostaert, Christine	mailto:christinetoulmonde@gmail.com	féminin
Perwez - ATL	mailto:atl@perwez.be	féminin
Wolfs, Pierre	mailto:p.wolfs@eiga.eu	masculin
Denis, Raymonde	mailto:raydenis2003@yahoo.fr	féminin
Hennuy, Rafaël	mailto:hennuy.rafael@gmail.com	masculin
Ingels, Marie	mailto:mingels@gmail.com	féminin
Peeters, Véronique	mailto:peetersvero@hotmail.com	féminin
Le Clément de Saint-Marcq, Sandrine	mailto:olivier.deghellinck@gmail.com	féminin
Dewulf, Louise	mailto:dewulf555@live.be	féminin
Drappier, Jean-Charles	mailto:drappier.vanhove@gmail.com	masculin
\.


--
-- Name: barcodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.barcodes_id_seq', 76, true);


--
-- Name: drafts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.drafts_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

