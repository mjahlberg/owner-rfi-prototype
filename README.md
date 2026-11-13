# Evolve Owner RFI

A case study prototype for Evolve's owner Request for Information (RFI) flow, by Matthew Ahlberg.

**Live prototype:** https://mjahlberg.github.io/owner-rfi-prototype/

## The problem

About two in three owners who start the RFI don't finish. Most of the loss happens at two steps. 35% of owners drop off at contact information and 30% drop off at the address.

## The idea

Owners quit at the point where they stop being anonymous. Property type and bedroom count could be anyone's. An address, a name, and a phone number mean Evolve can find you and call you.

Today the flow opens with "See if you qualify," which puts the owner on trial. This flow flips that. Evolve has to win the owner over first, so owners stay anonymous until they've gotten something back, and sharing their details feels like their choice. Each drop-off point now comes right after a payoff. The rough estimate earns the address, and the full reveal earns the contact info.

1. **Estimate first.** Bedrooms, bathrooms, and ZIP on the landing page give a rough yearly range before anything personal is asked.
2. **Your place.** Property type and whether guests get the entire place. These check eligibility early, so owners Evolve can't help find out before sharing anything.
3. **Where you're starting from.** Furnished or not, and whether it's rented out now. Both are one tap.
4. **Your address.** Framed as the way to get an exact estimate for their home.
5. **What your place could earn.** The exact estimate and how far it narrowed, the nightly rate and nights booked, what the owner keeps after Evolve's fee, what that fee covers, and similar Evolve homes nearby with the owner's place in the same row.
6. **Where to send your estimate.** Name, email, and phone, then one choice: set up a call with an advisor, or just get the estimate for now. Sales can see which owners are ready, and the advisor emails to schedule instead of calling out of the blue.

Owners whose property isn't a fit get a kind exit with an option to hear if that changes.

## Assumptions

- The 35% and 30% drop-offs are shares of everyone who starts. Together they make up about 65%, which matches "two in three don't finish."
- Ineligible property types come from Evolve's public eligibility page. Shared rooms, timeshares, RVs, and mobile homes are routed to the kind exit.
- First and last name stay separate, matching what Evolve asks today.
- Every completed lead includes name, email, and phone, as the brief requires. Owners who choose "email me my estimate" get their estimate by email first, and sales can see they prefer a slower start.
- Response times like "usually the same day" and the 20-minute call are placeholders I'd confirm with sales before promising them.
- Estimates, comparable homes, neighborhood names, and photos are mocked for the prototype. Try ZIP 80206 or 80218 to see Denver neighborhood names.

## Expected lift

Out of every 100 owners who start, about 35 finish today. Assuming the address step comes first, 70% of owners get past it and 50% of those get past contact.

| Step | Today | This flow | Why |
|---|---|---|---|
| New early questions | none | 95 to 97% pass | One tap each, but every new screen loses a few people |
| Address | 70% pass | 78 to 85% pass | Comes after the estimate and is framed as getting the exact one |
| Contact | 50% pass | 60 to 70% pass | Comes right after the full reveal, and the call happens only if the owner asks |

Multiplied through, completion goes from about 35 to somewhere between 45 and 55 out of every 100 owners who start. Most of the gain should come from the contact step, since that's the one the reveal sits in front of. These are hypotheses sized conservatively, not benchmarks.

## How I'd test it

- **Variants.** A is today's form. B is this flow. C asks for the address earlier and pays it back right away with an estimate, the way Vrbo does.
- **Primary metric.** Completed leads per owner who starts.
- **Guardrails.** Share of leads sales accepts, share sales actually reaches, and deals closed per 100 owners who start. Completion only counts if these hold.
- **Split the leads.** Report "set up a call" and "just send my estimate" owners separately so the slower path can't hide a drop in quality.
- **Track every step.** Step viewed, step completed, and exits, so we know which change moved the number.
- **Size.** Spotting a 5 point lift from a 35% baseline needs roughly 1,500 owners who start per variant. Run in full weeks and read results by device and traffic source.

My biggest open assumption is that most owners will pick "just send my estimate." That's fine if they're owners we'd otherwise lose, and a problem if they would have taken the call. That's why the test measures deals closed, not just completions.

## If it doesn't work

- **Address drop-off holds.** Try one autocomplete field instead of four, or move the address earlier with an instant payoff (variant C).
- **Contact drop-off holds.** Test phone as optional for owners who only want the estimate, and measure whether sales loses deals.
- **Completion rises but quality drops.** Tighten the eligibility questions, or send estimate-only owners to nurture emails before sales.
- **Hardly anyone picks a call.** Test the wording and the order of the two options, then try asking about intent up front.

## What I cut and why

- **A live summary card beside the questions.** It repeated what owners just answered and added noise.
- **An intro screen.** A click with no payoff. The "about 2 minutes" note moved under Get started.
- **A photo of the owner's house.** Street View felt invasive and a guessed stock photo felt wrong. Nearby Evolve homes do the job honestly.
- **A month by month earnings chart.** Interesting, but not worth the space on the most important screen.
- **A privacy note at the address step.** It made the ask feel heavier instead of safer.
- **Call or text, and a time picker.** People screen unknown numbers, so the advisor emails to schedule instead.
- **Asking "exploring or ready?" up front.** People answer it inaccurately before they've seen value. Their choice at the end is a better signal.

## What's next

- Tailor the flow to where owners come from. Skip the ZIP if a landing page already asked, and ask bedrooms if they arrive straight from an ad.
- Use real Evolve booking data for the estimate and nearby homes, and add a local rental rules check.
- Design the handoff to sales. Which fields reach the CRM, and what an advisor sees before the first email.
- Route owners with several properties to the Pro plan.

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
