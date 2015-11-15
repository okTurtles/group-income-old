# Design of Group Income

## Contribution Limits

Members can set limits to the amount that they are willing to shoulder the burden (in addition to the fairness check between monetizers).

**The contributor limit does not apply to members making less than the bucket amount.**

How the contribution limit relates to bucket sizes and the fairness check still remains to be sketched out.

TBD: If someone is making a lot and *could* help fill a lot of buckets but chooses not to, then perhaps *their own* bucket should be smaller in size (i.e. they're not helping the group much, so the group shouldn't be helping them much, especially since they don't need the help as much as some of the other members).

## Fairness Check Between Monetizers

The Fairness Check is a necessary measure to ensure that Group Income works and that people are willing to participate in the system. It exists because unfairness would otherwise naturally be created by the system simply based on when people receive paychecks. In otherwords, without the fairness check, two monetizers that make equal amounts per month would be sharing the monetary burden of the group unequally if they received payment at different times.

The algorithm automatically keeps track of sets of monetizers by tracking historical income.

In a group of 5 members with 2 monetizers and $1k BI, the two monetizers are weighted based on how much they make.

So if they make equal amounts then the fairness check makes sure that they are contributing to the group equally (for the moment, we're imagining a situation where contributions-limits are not enabled). In a 10-month year, two monetizers making $100k/year each, will need to fill 3 buckets (other than theirs) and split that amount between themselves.

If A makes $200k/year and B $100k/year, then by default the fairness check makes it so that A pays a great proportion of the (3*12 = $36k) than B, since A is more capable. It's easier to see why this is fair if you compare two monetizers, one making $200k/year, and the other $20k/year. The $20k/year monetizer should not be expected to split the burden equally.

In the analogy of the oxen drawn carriage, the $20k/year monetizer is a smaller oxe than the $200k/year, and should not be burdened with the "weight" that is expected of the larger oxen. It would be like expecting a small child to life 100 pounds (several times their weight), simply unreasonable.

#### Monetizers Sets, Or What To Do When A Non-Monetizer Becomes A Monetizer

The idea is that everyone is providing a bucket's worth of value to the group, regardless of whether or not they are able to monetize that value. In other words, a housekeeper or a stay-at-home mother is providing real value that "the market" simply does not choose to monetize. They are, in other words, "paying back" their bucket's worth of value every month, regardless of how much they actually receive in tokens from the market.

But what happens when the market decides to send them tokens? In other words, what happens when the former non-monetizer starts to monetize their value?

The fairness check only operates between monetizers at the time they are monetizers. The non-monetizer *was* providing their bucket's worth of value to the group (or society) and so does not share the burden that previous monetizers were sharing between themselves. However, once they enter the monetizing set, then from *that point on* the fairness check starts to operate between them and the other monetizers.

## "Windfall Problem"

When a member receives a large amount all of a sudden (based on historical data), then the app can notify them and let them decide what to do, while showing the impact that their decision would have on the group.

To-be-fleshed out in more detail.