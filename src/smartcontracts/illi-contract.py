from boa.interop.Neo.Runtime import GetTrigger,CheckWitness
from boa.interop.Neo.Storage import Get,Put,Delete,GetContext
from boa.interop.Neo.TriggerType import Application, Verification


def Main(operation, addr, value):
    print("ill-contract-run")

    if not is_valid_addr(addr):
        return False

    ctx = GetContext()

    if operation == 'add':
        balance = Get(ctx, addr)
        new_balance = balance + value
        Put(ctx, addr, new_balance)
        return new_balance

    elif operation == 'remove':
        balance = Get(ctx, addr)
        Put(ctx, addr, balance - value)
        return balance - value

    elif operation == 'balance':
        return Get(ctx, addr)

    return False


def is_valid_addr(addr):
    if len(addr) == 20:
        return True
    return False
