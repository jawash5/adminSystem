import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { deleteImage } from '../../api'
import PropTypes from 'prop-types'
import { BASE_IMG_URL } from '../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

class PicturesWall extends Component {
  static propTypes = {
    images: PropTypes.array
  }

  constructor(props) {
    super(props)
    let fileList = []
    const { images } = props
    if (images && images.length > 0) {
      fileList = images.map((image, index) => ({
        uid: -index,
        name: image,
        status: 'done',
        url: BASE_IMG_URL + image
      }))
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    })
  }

  handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      const res = file.response
      if (res.status === 0) {
        message.success('图片上传成功')
        const { name, url } = res.data
        file.name = name
        file.url = url
      } else {
        message.error('图片上传失败')
      }
    } else if (file.status === 'removed') {
      deleteImage({ name: file.name }).then((response) => {
        if (response.status === 0) {
          message.success('删除图片成功')
        } else {
          message.error('删除图片失败')
        }
      })
    }

    this.setState({ fileList })
  }

  getImages = () => {
    return this.state.fileList.map((file) => file.name)
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <>
        <Upload
          action="/manage/img/upload"
          accept="image/*"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="预览图" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}

export default PicturesWall
