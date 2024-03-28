--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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

SET default_table_access_method = heap;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: luislira
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    user_id integer,
    game_id integer
);


ALTER TABLE public.favorites OWNER TO luislira;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: luislira
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorites_id_seq OWNER TO luislira;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luislira
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: luislira
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name character varying,
    year integer,
    thumbnail character varying,
    primary_color character varying,
    is_released boolean
);


ALTER TABLE public.games OWNER TO luislira;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: luislira
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.games_id_seq OWNER TO luislira;

--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luislira
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: luislira
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying,
    hashed_password character varying
);


ALTER TABLE public.users OWNER TO luislira;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: luislira
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO luislira;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luislira
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: luislira
--

COPY public.favorites (id, user_id, game_id) FROM stdin;
1	1	1
2	1	3
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: luislira
--

COPY public.games (id, name, year, thumbnail, primary_color, is_released) FROM stdin;
1	The Legend of Zelda: Ocarina of time	1998	http://localhost/static/zelda_oot.png	#111	t
2	Super Mario Wonder	2023	http://localhost/static/super_mario_wonder.jpg	#123456	t
3	The Legend of Zelda: Breath of the wild	2017	http://localhost/static/zelda_botw.jpeg	#a1b2c3	t
6	Kirby and the Forgotten Land	2022	http://localhost/static/kirby_fogotten_land.png	#0a0a0a	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: luislira
--

COPY public.users (id, email, hashed_password) FROM stdin;
1	luis@email.com	$2b$12$LP.zdQNzMGgt.9/rmzZMSe74wNLpPi8wbJtlAe0bLZCjRuVLVTOjG
\.


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: luislira
--

SELECT pg_catalog.setval('public.favorites_id_seq', 2, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: luislira
--

SELECT pg_catalog.setval('public.games_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: luislira
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: favorites unique_user_game; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT unique_user_game UNIQUE (user_id, game_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_favorites_id; Type: INDEX; Schema: public; Owner: luislira
--

CREATE INDEX ix_favorites_id ON public.favorites USING btree (id);


--
-- Name: ix_games_id; Type: INDEX; Schema: public; Owner: luislira
--

CREATE INDEX ix_games_id ON public.games USING btree (id);


--
-- Name: ix_games_name; Type: INDEX; Schema: public; Owner: luislira
--

CREATE UNIQUE INDEX ix_games_name ON public.games USING btree (name);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: luislira
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: luislira
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- Name: favorites favorites_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id);


--
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

