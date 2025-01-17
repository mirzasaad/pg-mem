import { IMemoryTable, Schema, TableEvent, IndexDef, ISubscription, nil, ColumnDef } from './interfaces';
import { IValue, _ITable, CreateIndexDef, _Transaction, _ISchema, _Column, SchemaField, _IIndex, _Explainer, _SelectExplanation, ChangeHandler, Stats, DropHandler, IndexHandler, Reg, ChangeOpts, _IConstraint, TruncateHandler, TruncateOpts } from './interfaces-private';
import { Map as ImMap } from 'immutable';
import { CreateColumnDef, TableConstraintForeignKey, TableConstraint, Expr, Name, ExprRef } from 'pgsql-ast-parser';
import { ColRef } from './column';
import { Alias } from './transforms/alias';
import { DataSourceBase } from './transforms/transform-base';
declare type Raw<T> = ImMap<string, T>;
declare class ColumnManager {
    private _columns?;
    readonly map: Map<string, ColRef>;
    get columns(): readonly IValue[];
    invalidateColumns(): void;
    get: (key: string) => ColRef | undefined;
    has: (key: string) => boolean;
    values: () => IterableIterator<ColRef>;
    set(name: string, colDef: ColRef): Map<string, ColRef>;
    delete(name: string): boolean;
}
export declare class MemoryTable<T = any> extends DataSourceBase<T> implements IMemoryTable, _ITable<T> {
    get isExecutionWithNoResult(): boolean;
    private handlers;
    readonly selection: Alias<T>;
    private _reg?;
    get reg(): Reg;
    get columns(): readonly IValue<any>[];
    private it;
    private cstGen;
    private hasPrimary;
    private readonly;
    hidden: boolean;
    private dataId;
    private serialsId;
    private constraintsByName;
    private indexByHashAndName;
    readonly columnMgr: ColumnManager;
    name: string;
    private changeHandlers;
    private truncateHandlers;
    private drophandlers;
    private indexHandlers;
    get type(): "table";
    get debugId(): string;
    entropy(t: _Transaction): number;
    isOriginOf(a: IValue<any>): boolean;
    constructor(schema: _ISchema, t: _Transaction, _schema: Schema);
    register(): this;
    stats(t: _Transaction): Stats | null;
    rename(name: string): this;
    getColumn(column: string | ExprRef): IValue;
    getColumn(column: string | ExprRef, nullIfNotFound?: boolean): IValue | nil;
    explain(e: _Explainer): _SelectExplanation;
    addColumn(column: SchemaField | CreateColumnDef, t: _Transaction): _Column;
    getColumnRef(column: string): ColRef;
    getColumnRef(column: string, nullIfNotFound?: boolean): ColRef | nil;
    bin(t: _Transaction): Raw<T>;
    setBin(t: _Transaction, val: Raw<T>): Raw<T>;
    on(event: TableEvent, handler: () => any): ISubscription;
    raise(event: TableEvent): void;
    setReadonly(): this;
    setHidden(): this;
    enumerate(t: _Transaction): Iterable<T>;
    find(template?: T, columns?: (keyof T)[]): Iterable<T>;
    remapData(t: _Transaction, modify: (newCopy: T) => any): void;
    insert(toInsert: T): T;
    doInsert(t: _Transaction, toInsert: T, opts?: ChangeOpts): T;
    private changePlan;
    update(t: _Transaction, toUpdate: T): T;
    delete(t: _Transaction, toDelete: T): T;
    truncate(t: _Transaction, _opts?: TruncateOpts): void;
    private indexElt;
    hasItem(item: T, t: _Transaction): boolean;
    getIndex(...forValues: IValue[]): _IIndex | nil;
    constraintNameGen(constraintName?: string): string;
    addCheck(_t: _Transaction, check: Expr, constraintName?: string): _IConstraint;
    createIndex(t: _Transaction, expressions: CreateIndexDef): _IConstraint | nil;
    createIndex(t: _Transaction, expressions: Name[], type: 'primary' | 'unique', indexName?: string | nil): _IConstraint;
    private determineIndexRelName;
    dropIndex(t: _Transaction, uName: string): void;
    onIndex(sub: IndexHandler): ISubscription;
    listIndices(): IndexDef[];
    get primaryIndex(): IndexDef | null;
    addForeignKey(cst: TableConstraintForeignKey, t: _Transaction): _IConstraint | nil;
    getConstraint(constraint: string): _IConstraint | nil;
    addConstraint(cst: TableConstraint, t: _Transaction): _IConstraint | nil;
    private checkNoConstraint;
    onBeforeChange(columns: 'all' | (string | _Column)[], check: ChangeHandler<T>): ISubscription;
    onCheckChange(columns: string[], check: ChangeHandler<T>): ISubscription;
    getColumns(): Iterable<ColumnDef>;
    private _subChange;
    drop(t: _Transaction, cascade: boolean): void;
    onDrop(sub: DropHandler): ISubscription;
    onTruncate(sub: TruncateHandler): ISubscription;
}
export {};
//# sourceMappingURL=table.d.ts.map