/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createCategoryRouter from "./Category.router";
import createCompanyRouter from "./Company.router";
import createProductRouter from "./Product.router";
import createInventoryRouter from "./Inventory.router";
import createPricingRouter from "./Pricing.router";
import createOrderRouter from "./Order.router";
import createOrderItemRouter from "./OrderItem.router";
import createReviewRouter from "./Review.router";
import createUserRouter from "./User.router";
import createPushNotificationRouter from "./PushNotification.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as CategoryClientType } from "./Category.router";
import { ClientType as CompanyClientType } from "./Company.router";
import { ClientType as ProductClientType } from "./Product.router";
import { ClientType as InventoryClientType } from "./Inventory.router";
import { ClientType as PricingClientType } from "./Pricing.router";
import { ClientType as OrderClientType } from "./Order.router";
import { ClientType as OrderItemClientType } from "./OrderItem.router";
import { ClientType as ReviewClientType } from "./Review.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as PushNotificationClientType } from "./PushNotification.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        category: createCategoryRouter(router, procedure),
        company: createCompanyRouter(router, procedure),
        product: createProductRouter(router, procedure),
        inventory: createInventoryRouter(router, procedure),
        pricing: createPricingRouter(router, procedure),
        order: createOrderRouter(router, procedure),
        orderItem: createOrderItemRouter(router, procedure),
        review: createReviewRouter(router, procedure),
        user: createUserRouter(router, procedure),
        pushNotification: createPushNotificationRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    category: CategoryClientType<AppRouter>;
    company: CompanyClientType<AppRouter>;
    product: ProductClientType<AppRouter>;
    inventory: InventoryClientType<AppRouter>;
    pricing: PricingClientType<AppRouter>;
    order: OrderClientType<AppRouter>;
    orderItem: OrderItemClientType<AppRouter>;
    review: ReviewClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    pushNotification: PushNotificationClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}
