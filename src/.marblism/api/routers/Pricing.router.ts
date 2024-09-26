/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.PricingInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pricing.createMany(input as any))),

        create: procedure.input($Schema.PricingInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pricing.create(input as any))),

        deleteMany: procedure.input($Schema.PricingInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pricing.deleteMany(input as any))),

        delete: procedure.input($Schema.PricingInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pricing.delete(input as any))),

        findFirst: procedure.input($Schema.PricingInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).pricing.findFirst(input as any))),

        findMany: procedure.input($Schema.PricingInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).pricing.findMany(input as any))),

        findUnique: procedure.input($Schema.PricingInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).pricing.findUnique(input as any))),

        updateMany: procedure.input($Schema.PricingInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pricing.updateMany(input as any))),

        update: procedure.input($Schema.PricingInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).pricing.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PricingCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PricingCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PricingCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PricingCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PricingCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PricingCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PricingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PricingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PricingCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PricingCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PricingGetPayload<T>, Context>) => Promise<Prisma.PricingGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PricingDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PricingDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PricingDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PricingDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PricingDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PricingDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PricingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PricingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PricingDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PricingDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PricingGetPayload<T>, Context>) => Promise<Prisma.PricingGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PricingFindFirstArgs, TData = Prisma.PricingGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PricingFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PricingGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PricingFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PricingFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PricingGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PricingGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PricingFindManyArgs, TData = Array<Prisma.PricingGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.PricingFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PricingGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PricingFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PricingFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PricingGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PricingGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PricingFindUniqueArgs, TData = Prisma.PricingGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PricingFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PricingGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PricingFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PricingFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PricingGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PricingGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PricingUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PricingUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PricingUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PricingUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PricingUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PricingUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PricingGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PricingGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PricingUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PricingUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PricingGetPayload<T>, Context>) => Promise<Prisma.PricingGetPayload<T>>
            };

    };
}
