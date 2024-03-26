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
    user_id integer NOT NULL,
    game_id integer NOT NULL
);


ALTER TABLE public.favorites OWNER TO luislira;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: luislira
--

ALTER TABLE public.favorites ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.favorites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: games; Type: TABLE; Schema: public; Owner: luislira
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.games OWNER TO luislira;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: luislira
--

ALTER TABLE public.games ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: luislira
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying,
    hashed_password text
);


ALTER TABLE public.users OWNER TO luislira;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: luislira
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: luislira
--

COPY public.favorites (id, user_id, game_id) FROM stdin;
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: luislira
--

COPY public.games (id, name) FROM stdin;
1	The Legend of Zelda
2	Super Mario Wonder
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: luislira
--

COPY public.users (id, email, hashed_password) FROM stdin;
7	luis@email.com	$2b$12$pzg7V2sNrrmwIhpELa7a1uiyWbszBLX.EuonzGAfMrJ/BkXjOALPC
\.


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: luislira
--

SELECT pg_catalog.setval('public.favorites_id_seq', 1, false);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: luislira
--

SELECT pg_catalog.setval('public.games_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: luislira
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: favorites favorites_pk; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pk PRIMARY KEY (id);


--
-- Name: games games_pk; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pk PRIMARY KEY (id);


--
-- Name: games games_pk_2; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pk_2 UNIQUE (name);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: users users_pk_2; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk_2 UNIQUE (email);


--
-- Name: favorites favorites_games_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_games_id_fk FOREIGN KEY (game_id) REFERENCES public.games(id);


--
-- Name: favorites favorites_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

