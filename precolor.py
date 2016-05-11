import math

input_file = 'data/open_subs_1000.csv'
output_file = 'data/open_subs_1000_pre.csv'

c0 = [35,  55,    59];
c1 = [85,  73.5,  51];
c2 = [135, 92,    43];
c3 = [185, 110.5, 35];
c4 = [235, 129,   27];

fout = open(output_file, 'w')

def dec2hex(x):
    return hex(int(x))[2:]

for l in open(input_file):
    x, y, alt = l.strip('\n').split(',')

    alt = float(alt)

    if alt < 0:
        r = math.floor(c0[0])
        g = math.floor(c0[1])
        b = math.floor(c0[2])
    elif alt < 100:
        r = math.floor(c0[0] + alt/100*(c1[0]-c0[0]))
        g = math.floor(c0[1] + alt/100*(c1[1]-c0[1]))
        b = math.floor(c0[2] + alt/100*(c1[2]-c0[2]))
    elif alt < 300:
        r = math.floor(c1[0] + (alt-100)/200*(c2[0]-c1[0]))
        g = math.floor(c1[1] + (alt-100)/200*(c2[1]-c1[1]))
        b = math.floor(c1[2] + (alt-100)/200*(c2[2]-c1[2]))
    elif alt < 1000:
        r = math.floor(c2[0] + (alt-300)/700*(c3[0]-c2[0]))
        g = math.floor(c2[1] + (alt-300)/700*(c3[1]-c2[1]))
        b = math.floor(c2[2] + (alt-300)/700*(c3[2]-c2[2]))
    elif alt < 1800:
        r = math.floor(c3[0] + (alt-1000)/800*(c4[0]-c3[0]))
        g = math.floor(c3[1] + (alt-1000)/800*(c4[1]-c3[1]))
        b = math.floor(c3[2] + (alt-1000)/800*(c4[2]-c3[2]))
    else:
        r = math.floor(c4[0])
        g = math.floor(c4[1])
        b = math.floor(c4[2])

    print r, g, b
    print dec2hex(r), dec2hex(g), dec2hex(b)

    fout.write("%s,%s,#%s%s%s\n" % (x, y, dec2hex(r), dec2hex(g), dec2hex(b)))

fout.close()

