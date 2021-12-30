package Controller.Profile.Elements.Email;

public class Attachment {

    byte[] encoded;
    String name;
    String type;



    public void setEncoded(byte[] encoded) {
        this.encoded = encoded;
    }

    public byte[] getEncoded(){
        return this.encoded;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
