from math import *

__author__ = 'Tommy'

n = 10

def eratothenes() :

    values = [1]*n
    result = []

    max = int(sqrt(n))

    for i in range(2, max +1) :

        if (values[i] == 1) :

            carre = i*i;

            max = int ( ( n / i ) - i )

            if(i == 3) :
                print(max)

            for j in range(carre, max, i) :

                current = carre + j * i


                print(current)

                values[current] = 0


    for i in range(0, n) :

        if ( values[i] != 0) :

            result.append(i)

    return result


result = eratothenes()

print(result)