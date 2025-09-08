# Realtime Fake Chat Room

This project simulates a dashboard to see realtime users login in and out of a chat room.

## Client

**Vite + React + TailwindCSS**

A dashboard that connects through websocket to a server that spans users login in and out.
It shows a realtime list of connected users.

## Server

**Node + express + socket.io**

A simple server to create a list of users, add and remove from that list simulating login in and out.
It emits events with socket.io