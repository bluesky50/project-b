const joinSubscriptionDef = "const SubscriptionDef: string = \ntype Subscription {\n${subscriptions.join('REPLACE_WITH_NEW_LINE')}\n}\n`;";

export default joinSubscriptionDef;