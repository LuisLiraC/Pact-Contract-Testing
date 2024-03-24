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
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: luislira
--

SELECT pg_catalog.setval('public.books_id_seq', 2, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: luislira
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


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

