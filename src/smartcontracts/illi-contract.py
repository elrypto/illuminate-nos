from boa.interop.Neo.Runtime import GetTrigger, CheckWitness

def Main(caller):
    print("ill-contract-run");

    isCaller = CheckWitness(caller)
    if isCaller:
        return True

    return False
