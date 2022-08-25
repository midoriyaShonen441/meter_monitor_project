import requests
import cv2
import numpy as np

def image_capture(img):
    img_name = "opencv_frame_1.png"
    cv2.imwrite(img_name, img)
    print("{} written!".format(img_name))


def read_qr_code(img):
    """Read an image and read the QR code.
    
    Args:
        filename (string): Path to file
    
    Returns:
        qr (string): Value from QR code
    """
    
    try:
        detect = cv2.QRCodeDetector()
        value, points, straight_qrcode = detect.detectAndDecode(img)

        if points is not None:
            points = [points[0].astype(int)]
            n = len(points[0])

            for i in range(n):
                cv2.line(img, tuple(points[0][i]), tuple(points[0][(i+1) % n]), (0,255,0), 10)

            x = [p[0] for p in points[0]]
            y = [p[1] for p in points[0]]
            centroid = (round(sum(x) / n), round(sum(y) / n))

            cv2.circle(img, (centroid[0], centroid[1]), 10, (0, 255, 0), -1)

        return value, centroid

    except:
        value = ""
        centroid = [0,0]
        return value, centroid

def stabilizer_check(centroid_x, centroid_y):

    x_diff = []
    y_diff = []

    for i in range(len(centroid_x)-1):
        x_diff.append(centroid_x[i] - centroid_x[i+1])
        y_diff.append(centroid_y[i] - centroid_y[i+1])
    
    x_diff_mean = np.array(x_diff).mean()
    y_diff_mean = np.array(y_diff).mean()

    if x_diff_mean < 50 and y_diff_mean < 50:
        return True
    else:
        return False 



cap = cv2.VideoCapture(0)
centroid_x_array = []
centroid_y_array = []

while True :
    _, img = cap.read()

    qr_value, centroid = read_qr_code(img)

    centroid_x_array.append(centroid[0])
    centroid_y_array.append(centroid[1])

    cv2.imshow("QRCODEscanner", img)

    if len(centroid_x_array) == 5:
        stabled = stabilizer_check(centroid_x_array, centroid_y_array)
        centroid_x_array = []
        centroid_y_array = []
        if stabled:
            image_capture(img)   

    if cv2.waitKey(1) == ord("q"):
        break

# URL = "http://maps.googleapis.com/maps/api/geocode/json"

# myobj = {'somekey': 'somevalue'}

# x = requests.post(url, json = myobj)