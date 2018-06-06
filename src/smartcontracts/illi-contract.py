
from boa.blockchain.vm.Neo.Runtime import CheckWitness

def Main(caller):
    print("ill-contract-run");

    isCaller = CheckWitness(caller)
    if isCaller:
        return True

    return False
