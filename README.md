# Evolve Owner RFI

A case study prototype for Evolve's owner Request for Information (RFI) flow, by Matthew Ahlberg.

**Live prototype:** https://mjahlberg.github.io/owner-rfi-prototype/

## The problem

About two in three owners who start the RFI don't finish. Most of the loss happens at two steps. 35% of owners drop off at contact information and 30% drop off at the address.

## The idea

Owners quit at the point where they stop being anonymous. Property type and bedroom count could be anyone's. An address, a name, and a phone number mean Evolve can find you and call you.

So this flow keeps owners anonymous until they've gotten something back, then makes sharing their details feel like their choice.

1. **Estimate first.** Bedrooms, bathrooms, and ZIP on the landing page give a rough yearly range before anything personal is asked.
2. **Your place.** Property type and whether guests get the entire place. These check eligibility early, so owners Evolve can't help find out before sharing anything.
3. **Where you're starting from.** Furnished or not, and whether it's rented out now. Both are one tap.
4. **Your address.** Framed as a way to sharpen the estimate, with a plain promise that it's only used for the estimate.
5. **What your place could earn.** The sharper estimate, a local rules check, and similar Evolve homes nearby that explain where the number comes from.
6. **You choose what's next.** Talk with someone (phone, call or text, a good time) or just get the estimate by email (phone optional). Sales can see which owners are ready.

Owners whose property isn't a fit get a kind exit with an option to hear if that changes.

## Assumptions

- The 35% and 30% drop-offs are shares of everyone who starts. Together they make up about 65%, which matches "two in three don't finish."
- Ineligible property types come from Evolve's public eligibility page. Shared rooms, timeshares, RVs, and mobile homes are routed to the kind exit.
- First and last name stay separate, matching what Evolve asks today.
- Owners who choose "email me my estimate" are nurture leads. Phone is optional for them, so sales may follow up by email first.
- Estimates, the rules check, comparable homes, neighborhood names, and photos are mocked for the prototype. Try ZIP 80206 or 80218 to see Denver neighborhood names.

## What's here

| File | What it holds |
|---|---|
| `index.html` | The landing page and the RFI flow |
| `styles.css` | All styles |
| `app.js` | The estimate, the flow's steps, and validation |
| `images/` | Logos and sample photos |

No build step and no dependencies. Open `index.html` in a browser to run it.

## Built with

Designed and built with Claude as a design and coding partner. More on that workflow in the walkthrough video.
