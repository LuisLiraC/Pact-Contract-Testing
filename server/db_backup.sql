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
-- Name: books; Type: TABLE; Schema: public; Owner: luislira
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying
);


ALTER TABLE public.books OWNER TO luislira;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: luislira
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_id_seq OWNER TO luislira;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luislira
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


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
-- Name: books id; Type: DEFAULT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: luislira
--

COPY public.books (id, title) FROM stdin;
1	The Great Gatsby
2	test
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: luislira
--

COPY public.users (id, email, hashed_password) FROM stdin;
7	luis@email.com	$2b$12$pzg7V2sNrrmwIhpELa7a1uiyWbszBLX.EuonzGAfMrJ/BkXjOALPC
\.


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: luislira
--

SELECT pg_catalog.setval('public.books_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: luislira
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


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
-- Name: ix_books_id; Type: INDEX; Schema: public; Owner: luislira
--

CREATE INDEX ix_books_id ON public.books USING btree (id);


--
-- Name: ix_books_title; Type: INDEX; Schema: public; Owner: luislira
--

CREATE INDEX ix_books_title ON public.books USING btree (title);


--
-- PostgreSQL database dump complete
--

