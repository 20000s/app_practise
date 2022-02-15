public class TestProtobuf {

    public static void main(String[]args)throws IOException{
        FirstProtobuf.testBuf.Builder builder = FirstProtobuf.testBuf.newBuilder();
        builder.setID(1);
        builder.setUrl("www.baidu.com");
        builder.addName("aaa");
        builder.addName("bbb");
        builder.addName("ccc");
        FirstProtobuf.testBuf info = builder.build();
        byte[] result = info.toByteArray();
        System.out.println("google protobuf====="+result.length);
        FirstProtobuf.testBuf testBuf = FirstProtobuf.testBuf.parseFrom(result);
        System.out.println(testBuf);
    }

}