# Amne Feature Proposal


## New Feature

When sellers receive an offer, sellers will be shown a selection of homes currently on the market which they may be interested in buying after selling their home to Amne.


## Problem
Amne's platform enables homeowners to sell their home in as little as a week. However, finding a new home may take longer than that. If the buying and selling time-frames do not match up, a seller may be discouraged from using the Amne platform. Although Amne's upcoming portal for buyers may alleviate this problem, potential buyers may not find their ideal home in Amne's inventory.


## Solution

The Amne platform can help sellers by providing third-party real estate listings together with Amne's offer. Sellers answer questions about their property and reasons for selling before they are shown an offer. This information, along with the offer amount, can be used to find appropriate homes for seller. 

For example, a young family wants to move into a larger home. Amne generates an offer and highlights available listings based on their needs and the offer. With an offer on the table, the sellers have a better idea of their budget and can more confidently peruse the homes available.

Empty-nesters, on the other hand, may be looking to downgrade. By seeing their offer beside a selection of available smaller homes, the sellers will have a better idea of how much money will be left over after their move.

## Implementation

Relevant questions will be added to the form sellers fill out prior to receiving an offer, such as their destination, desired size of home, etc.

Before an offer is sent, Amne requests listings from a third-party listings API, using a query based on the answers provided.

The listings can then be sent to a recommendations API (such as Microsoft Cognitive Services') in order to rank the best listings to show the seller.

The offer is emailed to the seller, along with the list of homes on the market. To better train the recommendation API, the links in the email go to Amne endpoints, which will redirect the user to the appropriate listing, and confirm to the API that the link was clicked.