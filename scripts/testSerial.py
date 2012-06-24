import serial
import time
import sys

port = "/dev/tty.bluetooth-Bailey"
#port = "/dev/tty.bluetooth-Jamie"
#port = "/dev/tty.nxt8"
#port = "/dev/tty.Jamie-DevB"

ser = serial.Serial(port, 115200, timeout=None)
ser.flushInput()
ser.flushOutput()
#ser = serial.Serial(port, 115200)
package = "\x0c\x00\x80\x04\x00\x64\x07\x01\x00\x20\x00\x00\x00\x00"

#if len(sys.argv)>1 and sys.argv[1] == 'stop':
#  package = "\x0c\x00\x80\x04\x00\x00\x07\x01\x00\x20\x00\x00\x00\x00"
#  print 'stop'

x = ser.write(package)
print 'baudrate: ', ser.baudrate
print 'Write output: ', x
ser.flush()

time.sleep(2)

package = "\x0c\x00\x80\x04\x00\x00\x07\x01\x00\x20\x00\x00\x00\x00"
x = ser.write(package)
print 'Write output: ', x

#while True:
#    data = ser.read(9999)
#    if len(data) > 0:
#        print 'Got:', data
#
#    sleep(0.5)

ser.close()
