import React from 'react';
import './draft.css';
import { Decklist } from '../decklist/decklist';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export function Draft() {
    return (
      <main>
            <h1>
                Pack 1 of 3
            </h1>
            <div className = "container">
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
                <img alt = "Card" src = "./Card back.webp" width = "275" height = "400" />
            </div>
            <br />
            <br />
            <NavLink className = "nav-link" to = "/decklist">Save</NavLink>
        </main>
    );
  }