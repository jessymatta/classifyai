interface Roles {
    [key: string]: number
}

export function getRoleNameByValue(object: Roles, value: number) {
    return Object.keys(object).find(key => object[key] === value)?.replace(/_/g, ' ');
}