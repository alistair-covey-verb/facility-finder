# Booking Engine

A short front-end exercise against a real hotel API, to do by yourself
and in your own repo before the call on the 8th October.

Treat it as the first slice of a product rather than a throwaway: the app you
start here is one we would expect to keep adding to — more routes, rates and
availability, a booking flow, more filters. Build it so that the next feature
is easy to add and the next developer can find their way around.

## The stack

Please use these:

- **[Vite](https://vite.dev)** with **TypeScript** —
  `npm create vite@latest facility-finder -- --template react-ts` gets you there
  in one command.
- **[TanStack Router](https://tanstack.com/router)** —
  `npm i @tanstack/react-router` plus `@tanstack/router-plugin` if you want
  file-based routes, which we would recommend.
- **[Chakra UI](https://chakra-ui.com)** —
  `npm i @chakra-ui/react @emotion/react`, then
  `npx @chakra-ui/cli snippet add`, then wrap the app in the generated
  `Provider`. Their [Vite guide](https://chakra-ui.com/docs/get-started/frameworks/vite)
  has the five steps. Node 20 or newer.

Anything else you want to reach for — a data-fetching library, a test runner,
whatever — is fair game. Tell us why you picked it.

**We are not marking how it looks.** Stock components with no theming, no custom CSS
and no responsive work is a perfectly good answer, and an unlovely page costs you nothing.
Spend the time on the code instead.

## Using AI

We would rather see your own work. This is a small exercise and we are
reading it for how you think, which a generated answer does not tell us.

If you do reach for an assistant, say so in your note and say what it wrote.
Be ready to defend every line either way — your session will involve changing
this code in front of us, unaided, and explaining decisions in it.

Undisclosed use is the only thing here that would count against you on its
own.

## What to build

Six tickets, written the way you would get them from us. They are roughly
in dependency order — RF-1 and RF-2 are independent of each other, and each
ticket names what it needs.

---

### RF-1 · Property is selected by the URL

**Type:** Story · **Depends on:** nothing

> **As a** guest following a link to a hotel,
> **I want** the property I am looking at to be part of the address,
> **so that** the link still works when I bookmark it, share it or reload it.

The property code is a route parameter — `/60735`, or whatever URL shape you
prefer around it. The route owns which property is on screen; nothing else
does.

**Acceptance criteria**

- Opening `/60735` directly, in a fresh tab, renders that property. No
  navigation from elsewhere in the app is needed first.
- The code is read from the route. No component state holds a copy of the
  selected property.
- Editing the code in the address bar switches property.
- The browser's back and forward buttons move between properties visited.
- A code that is not one of ours does not crash the app or leave the page
  blank. Making that case presentable is RF-6.

**Out of scope**

- A property picker. Typing the code into the address bar is enough, and we
  are not assessing one.

---

### RF-2 · Get an access token, and hold on to it

**Type:** Technical task · **Depends on:** nothing

> **As the** app,
> **I need** a bearer token before I can ask the API anything,
> **so that** every other call has something to authenticate with.

The token call takes no credentials and is good for 48 hours — see
[The API](#the-api) for the request. It is the cheapest possible piece of
auth, which makes it a good place to decide how auth is going to work in this
codebase when it is no longer this simple.

**Acceptance criteria**

- `POST /api/tokens?dolliversion=v2` with a JSON body of `{}` returns a
  token, and `accessToken` is pulled off the response.
- One token is fetched and reused. It is not requested per component, per
  render, per property or per keystroke.
- Two things needing the token at once do not each start their own request.
- A failed token call is surfaced as a failure the UI can act on, not an
  `undefined` that turns into a broken request further down.
- A rejected or expired token is recovered from — fetched once more, not in a
  loop.
- Nothing else in the app needs to know how the token was obtained.

---

### RF-3 · Fetch the property for the code in the URL

**Type:** Technical task · **Depends on:** RF-1, RF-2

> **As the** app,
> **I need** the property record for whichever code is in the address,
> **so that** the screen has something real to render.

One GET, authenticated with the token from RF-2. The response is large and
you need a small part of it; the interesting decisions are where that call
lives, what shape it hands back and what the rest of the app is allowed to
see of it.

**Acceptance criteria**

- `GET /api/hotel/infos/{hotelCode}?dolliversion=v2` is sent with the bearer
  token and the code taken from the route.
- What the rest of the app receives is a shape you have defined, not the raw
  payload passed around untouched.
- Changing the code in the URL fetches the new property.
- An in-flight request for a property that is no longer the one in the URL
  never wins. Switching quickly between two properties leaves the right one
  on screen.
- A failed request, a request that succeeds with nothing useful in it, and a
  request still in flight are three distinguishable states to whatever is
  rendering.

---

### RF-4 · List a property's facilities

**Type:** Story · **Depends on:** RF-3

> **As a** guest deciding between hotels,
> **I want** to see what a property actually offers,
> **so that** I can tell whether it has the things I care about before I look
> at rooms or rates.

Facilities are on the property record at `hotelInfo.services`. They are coded
entries rather than marketing copy — there is no prose to lean on, so what
you put on screen and how you label it is a judgement call.

**Acceptance criteria**

- The facilities shown are the ones the API returns for the code in the URL.
- Each facility shows its **code** and its **name**.
- Facilities are not all alike — some are on site and some are not, and some
  are flagged as included. That difference reaches the screen somehow. How is
  up to you.
- An entry missing any of the optional fields still renders, without breaking
  the layout around it.
- A handful of facilities carry nested entries of their own, show them.
- Something sensible is on screen while the request is in flight.
- A property that fails to load says so. It does not spin forever, show an
  empty list as though the property had none.
- A property that genuinely returns none reads as empty, not as broken.

---

### RF-5 · Filter the facilities by name

**Type:** Story · **Depends on:** RF-4

> **As a** guest who already knows what matters to them,
> **I want** to narrow a long list of facilities as I type,
> **so that** I can check for the one thing I need without reading eighty
> entries.

**Acceptance criteria**

- A search input sits with the facilities list and filters it as the guest
  types. There is no submit button.
- Matching is against the facility name, case-insensitive, and matches
  anywhere in the name rather than only the start.
- Clearing the input restores the full list.
- A search that matches nothing says so, and says what was searched for.
- Filtering is local. It does not refetch the property.

**Worth a thought**

- Should the search term live in the URL too, next to the property code? We
  are not asking you to build it either way — but RF-1 took one position on
  URL-as-state and we would like to hear whether you think this belongs there
  as well.

---

### RF-6 · An unknown property code shows a 404

**Type:** Story · **Depends on:** RF-1, RF-3

> **As a** guest who has mistyped a URL or followed a link that has gone
> stale,
> **I want** to be told plainly that there is no such page,
> **so that** I am not left looking at a blank screen wondering whether it is
> still loading.

A code can be wrong in two different ways, and they are not the same
problem. It can be a code we do not have — catchable before you send
anything. Or it can be one the API refuses: `/12345` comes back `404` with
`Hotel with code "12345" not found`, which you only learn after asking.
Decide which of those you guard where, and whether a guest should be able to
tell the difference.

**Acceptance criteria**

- A property code that is not one of the fourteen ends on a not-found page.
- A code the API rejects ends on the same page, rather than a generic
  "something went wrong".
- The not-found page is the router's, not a conditional buried in the
  facilities component. TanStack Router has its own not-found handling —
  use it, or be ready to say why you did not.
- A transient failure is not mistaken for a missing property. A timeout, a
  dropped connection or a 500 must not tell the guest the hotel does not
  exist.
- No blank screen, no spinner that never stops, no crash, in any of the
  above.

## The API

Two calls. The first gets you a token, the second uses it.

```bash
# 1. token — no auth needed, valid for 48 hours
curl -X POST 'https://1hotels.uat.dolli.cloud/api/tokens?dolliversion=v2' \
  -H 'content-type: application/json' \
  -d '{}'
# -> { "accessToken": "eyJ0eXAi..." }

# 2. the property — facilities are at hotelInfo.services
curl 'https://1hotels.uat.dolli.cloud/api/hotel/infos/60735?dolliversion=v2' \
  -H 'authorization: Bearer <accessToken>'
```

This is our UAT environment, so the data is real. CORS is open to
`localhost`, so no proxy is needed. The response is large — have a look at
what is actually in it before deciding how to render it.

## The property codes

There is no endpoint that lists these, so hard-code them:

```
60735  66266  60507  77961  36017
47314  35903  5826   31116  7918
40333  41069  47157  96185
```

All fourteen are real properties and all of them answer on UAT.

## Sending it to us

A link to the repo is all we need. Push the whole history rather than a
single squashed commit — commit as you go, in whatever size steps you
normally work in. We read the history as part of the submission; it is the
clearest picture we get of how you got there.

Please include a short note in your own README covering:

- how to run it;
- anything you deliberately left out, and why;
- what you would do next if this were going into production;
- any AI assistance, and which parts it wrote.

Look at the data before you write anything. It answers more of the design
questions than the brief does.