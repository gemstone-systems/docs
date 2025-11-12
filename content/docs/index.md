---
title: Gemstone Documentation
---

Welcome friend! This is where you'll find documentation regarding Gemstone and all of its associated pieces.

If you want to simply try out Gemstone, you can head to [the app](https://app.gmstn.systems) and log in with your ATProto account through your PDS to get started.

## Introduction

### What is Gemstone?

Gemstone is a workspace app built on top of [ATProto](https://atproto.com), designed from the ground up for you to get the productivity benefits of the workspace apps that you're familiar with, but with none of the lock in and as little of the overhead as possible.

Gemstone comprises the following parts, each of which are explained more in their respective sections.

## Services

This is a complete set of services that are involved in Gemstone. In addition to these, we also use [Constellation](https://constellation.microcosm.blue/) to help us with traversing backlinks.

### Prism

[Prism](https://tangled.org/@gmstn.systems/prism) is our backend API. Others may term this as our 'appview', but it serves more than that.

In addition to filtering the [firehose](https://atproto.com/guides/glossary#relay) for events relevant to our services, it also does commit checking on the event stream of a relay to ensure that the upstream data is authentic.

Think of it like Bluesky's [Jetstream](https://github.com/bluesky-social/jetstream) but with verification, and also merged with their 'appview'.

### Lattice

[Lattice](https://github.com/gemstone-systems/lattice) is a routing server. Think of it like a post office which handles sending your message to other clients. You can self-host a Lattice instance on your own, or use our public ones.

When you create a channel, you can specify either a public Lattice or your own private one, and messages sent in those channels will route through their Lattices automatically.

### Shard

[Shard](https://github.com/gemstone-systems/shard) is a storage server. If Lattices are post offices, Shards are mail warehouses that store your data.

Similarly to a Lattice, when you create a channel, you can specify either a public Shard or your own private one, and messages sent in those channels will be store in their specified Shards automatically.

### Client

Our [Client](https://github.com/gemstone-systems/gemstone-app) is a React Native application (Expo) that lets you interface with Gemstone. Not much to talk about here.

## Lexicons

You can find our lexicons set on [GitHub](https://github.com/gemstone-systems/lexicons) or [Tangled](https://tangled.org/@gmstn.systems/lexicons).
