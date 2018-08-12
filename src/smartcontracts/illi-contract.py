from boa.interop.Neo.Runtime import GetTrigger,CheckWitness
from boa.interop.Neo.Storage import Get,Put,Delete,GetContext
from boa.interop.Neo.TriggerType import Application, Verification


def Main(operation, addr, value):
    print("ill-contract-run")

    if not is_valid_addr(addr):
        return False

    ctx = GetContext()

    if operation == 'add':
        Put(ctx, addr, value)

    elif operation == 'balance':
        return Get(ctx, addr)

    return False


def is_valid_addr(addr):
    if len(addr) == 20:
        return True
    return False
