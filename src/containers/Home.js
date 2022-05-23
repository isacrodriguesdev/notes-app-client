import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from
  "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { API } from "aws-amplify";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {

  const { isAuthenticated } = useAppContext();

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    async function onLoad() {

      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        console.log(notes)
        setNotes(notes); // add
      } catch (e) {
        console.log(e);
      }

      // // remove >
      // setNotes([{
      //   content: "Hello world!",
      //   noteId: "7e8bcb90-fb34-461c-a90a-97c42b888a46",
      //   createdAt: new Date()
      // }]); // < remove

      setIsLoading(false);
    }

    onLoad();

  }, [isAuthenticated]);

  async function loadNotes() {
    return await API.get("notes", "/notes");
  }

  function renderNotesList(notes) {

    console.log(notes)
    if (notes && notes.length > 0) {
      return notes.map((note, i) => {
        return (
          <Link key={note.noteId} to={`/notes/${note.noteId}`}>
            <ListGroupItem header={note.content.trim().split("\n")[0]}>
              {"Created: " + note.createdAt}
            </ListGroupItem>
          </Link>
        )
      })
    } else {
      return (
        <Link key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </Link>

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
          {/* {renderNotesList(notes)} */}
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