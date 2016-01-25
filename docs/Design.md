# Design of Group Income

## Contribution Caps

Members can set a cap on the amount that they are willing to contribute to the others' group income. This can provide predictability and stability for all members. The Contribution Cap does not apply to Income Streams lower than the basic income goal because they do not reach the contribution cusp. 

How the contribution limit relates to bucket sizes and the Fairness Check still remains to be sketched out.

TBD: If someone with a large income stream *could* help fill a lot of buckets but chooses not to, then perhaps *their own* bucket should be smaller in size (i.e. they're not helping the group much, so the group shouldn't be helping them much, especially since they don't need the help as much as some of the other members).

## Fairness Check Between Income Streams

The Fairness Check is a necessary measure to ensure that Group Income is fair to all members and that individuals are willing to participate in the system. The Fairness Check prevents the unfairness that would otherwise naturally be created by the system simply based on timing of payments. In other words, without the Fairness Check, two equal Income Streams with different pay schedules would contribute different amounts to the group because earlier payments are more likely to go towards the group's basic income than payments at the end of the month. For example, in a group with five $100k/year Income Streams, the five Income Streams will equally split contributions to the group's basic income amount between themselves, regardless of payment schedules. 

The Fairness Check also ensures that the contribution of each Income Stream is weighted proportional to its size. The algorithm automatically keeps track of sets of Income Streams by tracking historical income, to ensure that new, ending, and variable Income Streams are all properly considered.

If Income Stream "A" is $200k/year and Income Stream "B" $100k/year, then by default the Fairness Check ensures A makes a greater contribution towards the group's basic income than B, because A = 2B. The result is the same whether A and B were steady Income Streams throughout the year, or one began or ended mid-year. 

It's easier to see the Fairness Check in action by comparing two Income Streams, one of $200k/year and the other $20k/year. The $20k/year Income Stream should not be expected to split the contribution amount equally (e.g. each giving $8k), but rather proportionally. With the Fairness Check, the $200k/year Income Stream will contribute a substantially larger amount than the $20k/year Income Stream contributes, because $200k/year = 10 * $20k/year.

#### Income Stream Sets, Or What To Do When A New Income Stream Arises

Every member is providing a bucket's worth of value to the group (probably more), regardless of whether they are able to monetize that value. In other words, a housekeeper or a stay-at-home parent is providing real value that "the market" simply does not choose to monetize. In other words, each member is "paying back" their bucket's worth of value every month, regardless of how much they actually receive in tokens from the market.

But what happens when the market decides to send them tokens? In other words, what happens when a new Income Stream is created?

The Fairness Check only operates between Income Streams at the time they are Income Streams. The member *was* providing their bucket's worth of value to the group (or society) and so their new Income Stream's weighted contribution does not include previous months. However, an Income Stream begins, from *that point on* the Fairness Check starts to operate between it and the other Income Streams.

## "Windfall Problem"

When a member receives a large amount all of a sudden (based on historical data), then the app can notify them and let them decide what to do, while showing the impact that their decision would have on the group.

To-be-fleshed out in more detail.