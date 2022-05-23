import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from
  "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "@aws-amplify/api";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {

  const { isAuthenticated, user, token } = useAppContext();

  const [notes, setNotes] = useState([{ content: "Hello world!", noteId: 0 }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function onLoad() {

      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        console.log(e);
        // onError(e);
      }
      setIsLoading(false);
    }

    onLoad();

  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderNotesList(notes) {

    if (notes && notes.lenght > 0) {
      return notes.map((note, i) => {
        return (
          <LinkContainer key={note.noteId} to=
            {`/notes/${note.noteId}`}>
            <ListGroupItem header={note.content.trim().split("\n")[0]}>
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        )
      })
    } else {
      return (
        <div>
          <Link key="new" to="/notes/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroupItem>
          </Link>
        </div>
      )
    }
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {
        isAuthenticated ? renderNotes() : renderLander()
      }
    </div>
  );
}