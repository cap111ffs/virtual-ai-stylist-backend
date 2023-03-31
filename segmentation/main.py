from predict import predictColoredMask
from PIL import Image, ImageFilter
import tensorflow as tf


input_path = 'D:/backendVAIS/segmentation/input/input.jpg'

colored_mask_array = predictColoredMask(input_path)
colored_mask = tf.keras.utils.array_to_img(colored_mask_array)

with Image.open(input_path) as man_photo:
    man_photo.load()

mask = Image.new("L", colored_mask.size, 128)

colored_mask.filter(ImageFilter.BoxBlur(20))

segmented_photo = Image.composite(man_photo, colored_mask, mask)
segmented_photo.save('D:/backendVAIS/segmentation/output/ouput.jpg')
