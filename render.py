import sys
from PIL import ImageGrab
import numpy as np
import cv2
import ctypes
from ctypes.wintypes import HWND, DWORD, RECT
import datetime
from win32 import win32gui
import time

hwnd = win32gui.FindWindow(None, 'anitrone')
print(hwnd)

dwmapi = ctypes.WinDLL("dwmapi")
#hwnd = 787684    # refer to the other answers on how to find the hwnd of your window
rect = RECT()
DMWA_EXTENDED_FRAME_BOUNDS = 9
dwmapi.DwmGetWindowAttribute(HWND(hwnd), DWORD(DMWA_EXTENDED_FRAME_BOUNDS),
                             ctypes.byref(rect), ctypes.sizeof(rect))

print(rect.left, rect.top, rect.right, rect.bottom)

time_stamp = datetime.datetime.now().strftime('%Y-%m-%d %H-%M-%S')
file_name = f'{time_stamp}.mp4'
fourcc = cv2.VideoWriter_fourcc('m', 'p', '4', 'v')
captured_video = cv2.VideoWriter(file_name, fourcc, 30.0, (rect.right-rect.left, rect.bottom-rect.top))


st = sys.argv[1]
print(st)

start_time = time.time()
seconds = 8

while True:

    current_time = time.time()
    elapsed_time = current_time - start_time

    img = ImageGrab.grab(bbox=(rect.left, rect.top, rect.right, rect.bottom))
    img_np = np.array(img)
    img_final = cv2.cvtColor(img_np, cv2.COLOR_BGR2RGB)
    cv2.imshow('Capturer', img_final)
    captured_video.write(img_final)
    
    if cv2.waitKey(10) == ord('q'):
        break

    if elapsed_time > seconds:
        break