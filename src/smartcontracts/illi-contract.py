from boa.interop.Neo.Runtime import GetTrigger,CheckWitness
from boa.interop.Neo.Storage import Get,Put,Delete,GetContext
from boa.interop.Neo.TriggerType import Application, Verification

OWNER = b'\x03\x19\xe0)\xb9%\x85w\x90\xe4\x17\x85\xbe\x9c\xce\xc6\xca\xb1\x98\x96'

def Main():
    print("ill-contract-run")

    trigger = GetTrigger()

    if trigger == Verification():
        print("Running Verification!")
    #    is_owner = CheckWitness(OWNER)

    #    if is_owner:
    #        print("Is Owner!")
#            return True

#        print("Not Owner")
#            return False

    elsif trigger == Application():
         print("Running Application!")

    #      if not is_valid_addr(addr):
#              print("Not Valid Address")
              #return False

          ctx = GetContext()

          #if operation == 'add':
        #      balance = Get(ctx, addr)
        #      new_balance = balance + value
    #          Put(ctx, addr, new_balance)
    #          return new_balance

    #      elif operation == 'remove':
    #          balance = Get(ctx, addr)
    #          Put(ctx, addr, balance - value)
    #          return balance - value

    #      elif operation == 'balance':
    #          return Get(ctx, addr)

    #      return False

    #return False


#def is_valid_addr(addr):

  #if len(addr) == 20:
    #  return True
  #return False
