package com.csc3104.friends;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "friends")
public class Friend {
    @Field("sender")
    private String sender;

    @Field("recipient")
    private String recipient;

    public String getSender() {
        return sender;
    }

    public String getRecipient() {
        return recipient;
    }
}
