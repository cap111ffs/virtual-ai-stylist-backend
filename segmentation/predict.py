import tensorflow as tf
import tf_bodypix.api as tfbd


def predictColoredMask(image):

    bodypix_model = tfbd.load_model(tfbd.download_model(
    tfbd.BodyPixModelPaths.MOBILENET_FLOAT_50_STRIDE_16
    ))

    image = tf.keras.preprocessing.image.load_img(image)
    image_array = tf.keras.preprocessing.image.img_to_array(image)
    result = bodypix_model.predict_single(image_array)
    mask = result.get_mask(threshold=0.75)

    return result.get_colored_part_mask(mask)


