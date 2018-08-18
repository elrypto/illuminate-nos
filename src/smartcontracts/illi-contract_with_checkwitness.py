from boa.interop.Neo.Runtime import GetTrigger,CheckWitness
from boa.interop.Neo.Storage import Get,Put,Delete,GetContext
from boa.interop.Neo.TriggerType import Application, Verification

"""
Based on @deanpress' https://github.com/deanpress/neosense
"""


def Main(operation, args):

    """
    Main definition for the smart contracts

    :param operation: the operation to be performed
    :type operation: str

    :param args: list of arguments.
        args[0] is always sender script hash
        args[1] is a key for a value (likely a key to ipfs)
        args[2] is the value to be stored (likely ipfs hash)
    :param type: str

    :return:
        byterarray: The result of the operation
    """


    print("checking if authorized")
    # Am I who I say I am?
    user_hash = args[0]
    authorized = CheckWitness(user_hash)
    if not authorized:
        print("Not Authorized")
        return False
    print("Authorized")

    #blockchain key, is the key stored for the data stored (probably ipfs)
    blockchain_key = args[1]

    if operation == 'Save':
        print("operation = Save()")
        blockchain_value = args[2]
        Put(GetContext(), blockchain_key, blockchain_value)
        return True
    if operation == 'Get':
        print("operation = Get()")
        stored_value = Get(GetContext(), blockchain_key)
        if stored_value:
            return stored_value

    return False



#def Main(operation, addr, value):
#    print("ill-contract-run")

#    if not is_valid_addr(addr):
#        return False

#    ctx = GetContext()

#    if operation == 'add':
#        Put(ctx, addr, value)

#    elif operation == 'balance':
#        return Get(ctx, addr)

#    return False


#def is_valid_addr(addr):
#    if len(addr) == 20:
#        return True
#    return False
